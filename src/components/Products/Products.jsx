import axios from "axios";
import React, { useState } from "react";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";
// import { useQuery } from "react-query";
import { baseUrl } from "./../../utils/baseUrl";
import "./Products.css";
import emptyProducts from "../../assets/images/emptyProducts.svg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Helmet } from "react-helmet";
import Pagination from "../Pagination/Pagination";
import { useEffect } from "react";

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [limitItems, setLimitItems] = useState(12);
  const [productList, setProductList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [paginationData, setpaginationData] = useState({});

  async function getProducts(limit, page) {
    setIsLoading(true);
    try {
      let { data } = await axios.get(
        `${baseUrl}/products?limit=${limit}&page=${page}`
      );
      if (data) {
        setProductList(data?.data);
        setpaginationData(data?.metadata);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  // let { data, isLoading } = useQuery("getProducts", getProducts);

  function handleLimitItemsShow(num) {
    setLimitItems(num);
    getProducts(num, 1);
  }

  // ?==>search for products
  const filteredProducts = productList?.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    getProducts(limitItems, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Products</title>
        <meta name="keywords" content="FreshCart-App-Ecommerce-Products" />
      </Helmet>
      <div className="container my-5 pt-5">
        <div className="d-flex justify-content-between align-items-center my-3  overflow-hidden">
          <h2 className="h3">Products</h2>
          <select
            name=""
            className="form-select w-25"
            value={limitItems}
            onChange={(e) => {
              handleLimitItemsShow(e.target.value);
            }}
          >
            <option disabled value="">
              items
            </option>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="search-box  my-3 ">
          <button className="btn-search ms-auto">
            <i className="fas fa-search" />
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Type to Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row">
            {filteredProducts?.length > 0 ? (
              <>
                {filteredProducts?.map((item) => (
                  <Product key={item._id} item={item} />
                ))}
              </>
            ) : (
              <EmptyContent
                imageSrc={emptyProducts}
                message={`No found products about "${searchValue}" at the moment`}
              />
              // <div className="alert alert-success text-center fs-5">
              //   No products found at the moment
              // </div>
            )}
          </div>
        )}

        <Pagination
          paginationData={paginationData}
          getProducts={getProducts}
          limitItems={limitItems}
        />
      </div>
    </>
  );
}
