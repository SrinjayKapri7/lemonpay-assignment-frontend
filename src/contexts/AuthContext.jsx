import React, { createContext, useState, useEffect } from "react";
import { userProfile } from "../api/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser, setCurrentUser ] = useState(undefined);

  useEffect(() => {
    userProfile()
      .then((res) => {
        setCurrentUser(res?.data?.email || "User")
        setIsAuthenticated(true)
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, authLoading, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
