"use client";

import React, { createContext, useContext, useState } from "react";
import Alerts from "../components/alerts";
import { useOrder } from "./OrderContext";

// Create context
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { createOrder } = useOrder(); 
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [open, setOpen] = useState(false);

  // Alerts
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

  // Handle for create orders
  const handleCreateOrder = () => {
    if (cart.length === 0) {
      showAlert("Cart is empty. Cannot create an order.", "error");
    } else {
      createOrder(cart);
      showAlert("Order created successfully!", "success");
      setCart([]); 
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, createOrder: handleCreateOrder }}>
      {children}
      <Alerts open={open} setOpen={setOpen} alert={alert} setAlert={setAlert} />
    </CartContext.Provider>
  );
};
