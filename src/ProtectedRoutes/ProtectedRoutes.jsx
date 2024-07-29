import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { tokenContext } from "../Context/TokenContext";

export default function ProtectedRoutes({ children }) {
  let { setToken } = useContext(tokenContext);
  let token = localStorage.getItem("token");

  if (!token) return <Navigate to="/auth/signin" />;

  try {
    const decoded = jwtDecode(token);
    if (decoded) return children;
  } catch (err) {
    localStorage.clear();
    setToken(null);
    return <Navigate to="/auth/signin" />;
  }
}
