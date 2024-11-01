"use client";

import { initialProducts } from "../constants/inventory/constants";

const { createContext, useState, useContext } = require("react");

const ProductContext = createContext();

export const ProductProvider = ( {children} ) => {
    const [products, setProducts] = useState(initialProducts);

    const addProduct = (product) => 
        setProducts([...products, product]);

    const editProduct = (updatedProduct) => 
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));

    const deleteProduct = (id) => 
        setProducts(products.filter(p => p.id !== id));

    return (
        <ProductContext.Provider value={{ products, addProduct, editProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProducts = () => useContext(ProductContext)