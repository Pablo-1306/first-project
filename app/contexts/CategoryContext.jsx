"use client";

import axios from "axios";
const { useState, createContext, useContext, useEffect } = require("react");

// Create a context to store the categories and the CRUD operations
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  // Create a state to store the categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8003/api/v1/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  }
  

  // CREATE operation
  const addCategory = (category) => setCategories([...categories, category]);

  // UPDATE operation
  const editCategory = (updatedCategory) =>
    setCategories(
      categories.map((cat) =>
        cat._id === updatedCategory._id ? updatedCategory : cat,
      ),
    );

  // DELETE operation
  const deleteCategory = (_id) =>
    setCategories(categories.filter((cat) => cat._id !== _id));

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, editCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Export a function to use the categories context in any component
export const useCategories = () => useContext(CategoryContext);
