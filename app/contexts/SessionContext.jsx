"use client";
// AuthContext.js
import React, { createContext, useContext, useState } from "react";
import {
  registered_admin_users,
  registered_users,
} from "../constants/users/constants";

// We create the context
const AuthContext = createContext();

// Provider to wrap the application
export const AuthProvider = ({ children }) => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState(registered_users);
  const [adminUsers, setAdminUsers] = useState(registered_admin_users);
  const [currentUser, setGlobalCurrentUser] = useState("");

  // Function to log in and set if it's an admin
  const login = (auth, isAdmin) => {
    setIsAdminUser(isAdmin);
    setIsAuthenticated(auth);
  };

 // Function to log out
  const logout = () => {
    setIsAdminUser(false);
    setIsAuthenticated(false);
  };

  const removeUser = (remove_user) => {
    setUsers((users) =>
      users.filter((user) => user.email !== remove_user.email),
    );
  };

  return (
    <AuthContext.Provider
      value={{
        isAdminUser,
        isAuthenticated,
        users,
        adminUsers,
        currentUser,
        login,
        logout,
        setUsers,
        setAdminUsers,
        setGlobalCurrentUser,
        removeUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);
