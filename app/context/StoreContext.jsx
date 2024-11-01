'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

const STORAGE_KEY = 'store_products';

export function StoreProvider({ children }) {
  // Estado para categorías
  const [categories] = useState([
    { id: 1, name: 'Women', order: 1 },
    { id: 2, name: 'Men', order: 2 },
    { id: 3, name: 'Child', order: 3 },
    { id: 4, name: 'Winter', order: 4 },
    { id: 5, name: 'Summer', order: 5 }
  ]);

  // Estado para controlar si estamos en el cliente
  const [isClient, setIsClient] = useState(false);
  
  // Estado para productos
  const [products, setProducts] = useState({});

  // Efecto para cargar datos del localStorage solo en el cliente
  useEffect(() => {
    setIsClient(true);
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Efecto para guardar en localStorage cuando los productos cambien
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    }
  }, [products, isClient]);

  const addProduct = (categoryId, product) => {
    setProducts(prev => {
      const newProducts = {
        ...prev,
        [categoryId]: [
          ...(prev[categoryId] || []),
          {
            ...product,
            id: Date.now()
          }
        ]
      };
      return newProducts;
    });
  };

  const updateProduct = (categoryId, updatedProduct) => {
    setProducts(prev => {
      const newProducts = {
        ...prev,
        [categoryId]: prev[categoryId].map(p =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      };
      return newProducts;
    });
  };

  const deleteProduct = (categoryId, productId) => {
    setProducts(prev => {
      const newProducts = {
        ...prev,
        [categoryId]: prev[categoryId].filter(p => p.id !== productId)
      };
      return newProducts;
    });
  };

  const value = {
    categories,
    products,
    setProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    isClient // Exportamos isClient para usarlo en los componentes
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

export default StoreProvider;