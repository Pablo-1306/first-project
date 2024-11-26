"use client";

import React, { createContext, useContext, useState } from "react";
import Alerts from "../components/alerts";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [alert, setAlert] = useState({ message: "", severity: "success" });
  const [open, setOpen] = useState(false);

  // Alerts
  const showAlert = (message, severity = "success") => {
    setAlert({ message, severity });
    setOpen(true);
  };

  const addToCart = (product, quantity) => {
    if (!product.price || isNaN(product.price)) {
      showAlert("Product price is missing or invalid.", "error");
      return;
    }

    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        showAlert("Quantity updated successfully", "info");
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
      <Alerts open={open} setOpen={setOpen} alert={alert} setAlert={setAlert} />
    </CartContext.Provider>
  );
};
