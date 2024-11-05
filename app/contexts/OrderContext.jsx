"use client";

import React, { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const createOrder = (cartItems) => {
    const newOrder = {
      id: orders.length + 1,
      items: cartItems,
      date: new Date().toISOString(),
    };
    setOrders([...orders, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};