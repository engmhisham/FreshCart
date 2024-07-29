import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import { baseUrl } from "../../utils/baseUrl";
import { cartContext } from "./../../Context/CartContext";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetails({ productId, setCategoryId }) {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  let { setCartCounter, addToCart } = useContext(cartContext);

  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(`${baseUrl}/products/${productId}`);
    setProduct(data.data);
    setCategoryId(data.data.category._id);
    setIsLoading(false);
  }

  async function addProductToCart(productId) {
    setIsLoadingAdd(true);
    let { data } = await addToCart(productId);
    if (data.status === "success") {
      setIsLoadingAdd(false);
      toast.success("Product added successfully");
      setCartCounter(data.numOfCartItems);
    }
  }

  // useEffect(() => {
  //   getProductDetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{product.title}</title>
        <meta name="keywords" content={product.slug} />
      </Helmet>

      <div className="my-5 pt-5 d-flex justify-content-center align-items-center ">
        <div className="container pt-5">
          <div className="row justify-content-center align-items-center mb-5">
            <div className="col-md-4 mb-5 mb-md-0">
              <Slider {...settings}>
                {product?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product?.name}
                    className="d-block w-100 rounded-2"
                  />
                ))}
              </Slider>
            </div>

            <div className="col-md-8">
              <h4 className="fw-bold title-main">{product?.title}</h4>
              <p className="text-color ">{product?.description}</p>
              <p className="fs-6 my-1 text-main">{product?.category?.name}</p>
              <div className="d-flex justify-content-between my-3">
                <div>{product?.price} EGP</div>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>
                  {product?.ratingsAverage}
                </div>
              </div>
              <button
                className="btn bg-main text-white w-100 font-sm"
                onClick={() => addProductToCart(product?._id)}
                disabled={isLoadingAdd ? true : false}
              >
                {isLoadingAdd ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus me-1"></i> Add To Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
