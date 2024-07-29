import React from "react";
import notFound from "../../assets/images/error.svg";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <>
      <div className="container my-5 py-5 d-flex flex-column justify-content-center align-items-center">
        <img
          src={notFound}
          className="w-100"
          style={{ maxWidth: "450px" }}
          alt="404 not found img"
        />
        <h3 className="fw-bold">Not Found</h3>
        <p>This page doesn’t exist.</p>
        <Link className="btn fw-bold text-white bg-main" to="/home">
          Home
        </Link>
      </div>
    </>
  );
}
