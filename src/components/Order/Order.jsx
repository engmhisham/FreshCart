import React from "react";
import { Link } from "react-router-dom";

export default function Order({ item }) {
  return (
    
    <div className="row  my-3 py-3 px-2 border rounded-2 shadow-sm d-flex justify-content-center  bg-light">
      <div className="col-sm-6 col-md-5">
        <p>
          <span className="fw-bold">Date: </span>
          {new Date(item.createdAt).toLocaleString()}
        </p>
        <p>
          <span className="fw-bold">Total Price: </span>
          {item.totalOrderPrice} EGP
        </p>
        <p>
          <span className="fw-bold">paymentMethod: </span>
          {item.paymentMethodType}
        </p>
        <p>
          <span className="fw-bold">Delivered: </span>
          {item.isDelivered ? "Yes" : "No"}
        </p>
        <p>
          <span className="fw-bold">Paid: </span>
          {item.isPaid ? "Yes" : "No"}
        </p>
      </div>
      <div className="col-sm-6 col-md-5">
        <p>
          <span className="fw-bold">Products: </span>
        </p>
        {item.cartItems.map((el, index) => (
          <div key={index} className=" d-flex align-items-center my-1">
            <img
              src={el.product.imageCover}
              alt={el.product.title}
              width={40}
              loading="lazy"
            />
            <p className="font-sm mb-0 ms-2 ">
              <span className="fw-semibold text-main">
                {el.product.title.split(" ").slice(0, 3).join(" ")}
              </span>
              <span className="ms-2 ">x{el.count}</span>
            </p>
          </div>
        ))}
      </div>

      <div className=" col-md-2 align-self-center mt-3 mt-md-0 ">
        <p></p>
        <p>
          <span className="fw-bold">Order id: </span>
          {item.id}
        </p>
        <Link
          to={`/order-details/${item._id}`}
          className="btn bg-main text-white btn-sm d-block mx-auto"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
