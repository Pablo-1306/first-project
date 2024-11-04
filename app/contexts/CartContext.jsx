"use client";

import React, { createContext, useContext, useState } from "react";
import Alerts from "../components/alerts";

// Create the context
const CartContext = createContext();

// Hook to use the context in other components
export const useCart = () => useContext(CartContext);

// Cart context provider
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [open, setOpen] = useState(false);

  // Alert for the car
  const showAlert = (message, severity = "success") => {
    setAlert({ message, severity });
    setOpen(true);
  };

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If the product is already in the cart, update its quantity
        showAlert("Quantity updated successfully", "info");
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // If the product is not in the cart, add it
      showAlert("Product added to cart successfully", "success");
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    showAlert("Product removed from cart successfully", "warning");
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
    showAlert("Cart cleared", "warning");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
      <Alerts open={open} setOpen={setOpen} alert={alert} setAlert={setAlert} />
    </CartContext.Provider>
  );
};
