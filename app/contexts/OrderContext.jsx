"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch_orders();
  }, []);

  // Fetch orders from the DB
  const fetch_orders = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/v1/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  }

  // Function to create an order and add it to the DB
  const createOrder = async (cartItems) => {
    const newOrder = {
      _id: orders.length + 1,
      items: cartItems,
      date: new Date().toISOString(),
    };
    const response = await axios.post("http://localhost:8002/api/v1/orders", newOrder);
    setOrders([...orders, response.data]);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
