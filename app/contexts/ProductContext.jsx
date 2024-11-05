"use client";

import { initialProducts } from "../constants/products/constants";

const { useState, useContext, createContext } = require("react");

// Create a context to create the CRUD operations for the products
const ProductContext = createContext();

// Create a provider to wrap the application and give access to the products and the CRUD operations
export const ProductProvider = ({ children }) => {
  // Create a state to store the products
  const [products, setProducts] = useState(initialProducts);

  // Create operation
  const addProduct = (product) => setProducts([...products, product]);

  // Update operation
  const editProduct = (updatedProduct) =>
    setProducts(
      products.map((r) => (r.id === updatedProduct.id ? updatedProduct : r)),
    );

  // Delete operation
  const deleteProduct = (id) =>
    setProducts(products.filter((product) => product.id !== id));

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
