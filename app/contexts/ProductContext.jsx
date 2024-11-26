"use client";

const { useState, useContext, createContext, useEffect } = require("react");

import axios from "axios";

// Create a context to create the CRUD operations for the products
const ProductContext = createContext();

// Create a provider to wrap the application and give access to the products and the CRUD operations
export const ProductProvider = ({ children }) => {
  // Create a state to store the products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8001/api/v1/products");
      setProducts(response.data);
    }
    catch (error) {
      console.log("Error fetching products:", error);
    }
  }

  // Create operation
  const addProduct = (product) => setProducts([...products, product]);

  // Update operation
  const editProduct = (updatedProduct) =>
    setProducts(
      products.map((r) => (r._id === updatedProduct._id ? updatedProduct : r)),
    );

  // Delete operation
  const deleteProduct = (_id) =>
    setProducts(products.filter((product) => product._id !== _id));

  return (
    <ProductContext.Provider
      value={{ products, addProduct, editProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Export a hook to use the product context in any component
export const useProducts = () => useContext(ProductContext);
