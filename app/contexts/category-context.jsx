"use client";

import { initialCategories } from "../constants/categories/constants";
const { useState, createContext, useContext } = require("react");

// Create a context to store the categories and the CRUD operations
const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {

    // Create a state to store the categories
    const [categories, setCategories] = useState(initialCategories);

    // CREATE operation
    const addCategory = (category) => setCategories([...categories, category]);

    // UPDATE operation
    const editCategory = (updatedCategory) => 
        setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat));

    // DELETE operation
    const deleteCategory = (id) => setCategories(categories.filter(cat => cat.id !== id));

    return (
        <CategoryContext.Provider value={{categories, addCategory, editCategory, deleteCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}

// Export a function to use the categories context in any component
export const useCategories = () => useContext(CategoryContext);