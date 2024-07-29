import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedAuth({ children }) {
  let token = localStorage.getItem("token");

  if (!token) return children;

  return <Navigate to="/"></Navigate>;
}
