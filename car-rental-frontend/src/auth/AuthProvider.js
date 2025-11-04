import React, { createContext, useState, useEffect } from "react";
import api, { setAuthToken } from "../api";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem("auth");
    return s ? JSON.parse(s) : null;
  });

 useEffect(() => {
  if (user?.token) setAuthToken(user.token);
}, [user]);

const login = async (email, password) => {
  setAuthToken(null); // Clear old token
  const res = await api.post("/auth/login", { email, password });
  const { token, email: userEmail, fullName } = res.data;

  // Decode roles from JWT
 const decoded = jwtDecode(token);
  const roles = decoded.roles || [];

  const u = { token, email: userEmail, fullName, roles };
  localStorage.setItem("auth", JSON.stringify(u));
  setAuthToken(token);
  setUser(u);
  return u;
};


const register = async (fullName, email, password, isAdmin=false) => {
  await api.post("/auth/register", { fullName, email, password, isAdmin });
};


  const logout = () => {
    localStorage.removeItem("auth");
    setAuthToken(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};
