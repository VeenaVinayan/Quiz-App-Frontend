import React, { useState, useMemo } from 'react';
import { AuthContext } from './authContext';
import { type TUserData } from '../Types/auth.types';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<TUserData>({
    id: "",
    name: "",
    phone: "",
    email: "",
    isAdmin:false,
  });

  const login = (user: TUserData) => {
    console.log("User data from Auth provider :: ", user);
    setIsAuthenticated(true);
    localStorage.setItem("userId",user.id);
    setUserData(user);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("accessToken");
    setUserData({ id: "", name: "", phone: "", email: "" , isAdmin:false});
  };

  const getUserData = () => userData;

  const value = useMemo(
    () => ({ isAuthenticated, userData, login, logout, getUserData }),
    [isAuthenticated, userData]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
