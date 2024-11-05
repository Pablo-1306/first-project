'use client'
// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { registered_admin_users, registered_users } from '../constants/users/constants';

// Creamos el contexto
const AuthContext = createContext();

// Proveedor para envolver la aplicación
export const AuthProvider = ({ children }) => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(registered_users)
  const [adminUsers, setAdminUsers] = useState(registered_admin_users)
  const [currentUser, setGlobalCurrentUser] = useState('')

  // Función para iniciar sesión y establecer si es admin
  const login = (auth, isAdmin) => {
    setIsAdminUser(isAdmin);
    setIsAuthenticated(auth);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAdminUser(false);
    setIsAuthenticated(false);
  };

  const removeUser = (remove_user) => {
    setUsers((users) => users.filter((user) => user.email !== remove_user.email));
  };

  return (
    <AuthContext.Provider value={{ isAdminUser, isAuthenticated, users, adminUsers, currentUser, login, logout, setUsers, setAdminUsers, setGlobalCurrentUser, removeUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);