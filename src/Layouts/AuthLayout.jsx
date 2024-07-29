import React from "react";
// import logo from "../assets/images/logo.svg";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      
    </>
  );
}
