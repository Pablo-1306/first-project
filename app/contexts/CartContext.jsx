"use client";

import React, { createContext, useContext, useState } from "react";
import Alerts from "../components/alerts";
import { useOrder } from "./OrderContext";  // Importa el contexto de órdenes

// Crear el contexto de carrito
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { createOrder } = useOrder();  // Obtiene createOrder del contexto de órdenes
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [open, setOpen] = useState(false);

  // Mostrar alerta
  const showAlert = (message, severity = "success") => {
    setAlert({ message, severity });
    setOpen(true);
  };

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        showAlert("Quantity updated successfully", "info");
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      showAlert("Product added to cart successfully", "success");
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    showAlert("Product removed from cart successfully", "warning");
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    showAlert("Cart cleared", "warning");
  };

  // Función para crear la orden desde el carrito
  const handleCreateOrder = () => {
    if (cart.length === 0) {
      showAlert("Cart is empty. Cannot create an order.", "error");
    } else {
      createOrder(cart); // Llama a createOrder del contexto de órdenes
      showAlert("Order created successfully!", "success");
      setCart([]); // Limpia el carrito después de crear la orden
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, createOrder: handleCreateOrder }}>
      {children}
      <Alerts open={open} setOpen={setOpen} alert={alert} setAlert={setAlert} />
    </CartContext.Provider>
  );
};
