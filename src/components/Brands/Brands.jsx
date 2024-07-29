import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import "./Brands.css";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brands() {
  function getBrands() {
    return axios.get(`${baseUrl}/brands`);
  }
  let { data, isLoading } = useQuery("getBrands", getBrands);

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Brands</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Brands-Products" />
      </Helmet>
      <div className="brands container my-5 py-5">
        <h2 className="h3 mt-3">All Brands</h2>
        <div className="row g-4">
          {data?.data?.data.map((item) => {
            return (
              <div key={item._id} className="col-6 col-sm-4 col-md-3 ">
                <Link to={`/products/brand/${item.name}/${item._id}`}>
                  <div className="brand cursor-pointer rounded-3 p-2 overflow-hidden ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-100"
                      loading="lazy"
                    />
                    <h5 className=" fw-bold text-color my-3 text-center">
                      {item.name}
                    </h5>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
