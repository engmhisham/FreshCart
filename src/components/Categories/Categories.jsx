import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import "./Categories.css";
import { baseUrl } from "./../../utils/baseUrl";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Categories() {
  function getCategories() {
    return axios.get(`${baseUrl}/categories`);
  }
  let { data, isLoading } = useQuery("getCategories", getCategories);
  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Categories</title>
        <meta name="keywords" content="FreshCart-App-Ecommerce-Categories" />
      </Helmet>
      <div className="categories container my-5 py-5">
        <h2 className="h3 mt-3">All Categories</h2>
        <div className="row">
          {data?.data?.data.map((item) => {
            return (
              <div key={item._id} className="col-6  col-sm-4 col-md-3  ">
                <div className="category cursor-pointer rounded-3 p-2 overflow-hidden">
                  <Link to={`/products/category/${item.name}/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-100"
                      loading="lazy"
                    />
                    <h5 className="fw-bold text-color my-3 text-center">
                      {item.name}
                    </h5>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
