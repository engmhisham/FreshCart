/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../utils/baseUrl";
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import emptyProducts from "../../assets/images/emptyProducts.svg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Helmet } from "react-helmet";

export default function ProductsByCategory() {
  let { categoryName, categoryId } = useParams();
  const [productsList, setProductsList] = useState([]);
  const [productsCount, setProductsListCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getProductsByCategoryId() {
    try {
      let { data } = await axios.get(
        `${baseUrl}/products?category[in]=${categoryId}`
      );
      setIsLoading(false);
      setProductsList(data?.data);
      setProductsListCount(data?.results);
    } catch (err) {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getProductsByCategoryId();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`FreshCart-${categoryName}-Products`}</title>
        <meta name="keywords" content={`FreshCart-${categoryName}-Products`} />
      </Helmet>
      <div className="container my-5 py-5">
        <p className="fw-semibold my-3">
          Products founded:
          <span className="text-main mx-1">{productsCount}</span>
        </p>
        <div className="row">
          {productsCount > 0 ? (
            productsList.map((item) => {
              return <Product key={item._id} item={item} />;
            })
          ) : (
            <EmptyContent
              imageSrc={emptyProducts}
              message={"No products found at the moment"}
            />
          )}
        </div>
      </div>
    </>
  );
}
