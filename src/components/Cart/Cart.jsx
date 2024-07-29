/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import Loading from "./../Loading/Loading";
import CartItem from "../CartItem/CartItem";
import emptyCart from "../../assets/images/emptyCart.svg";
import EmptyContent from "../EmptyContent/EmptyContent";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { setCartCounter, getCart, clearCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartDetails, setCartDetails] = useState([]);

  async function clearUserCart() {
    setIsLoading(true);
    let { data } = await clearCart();
    if (data.message === "success") {
      setIsLoading(false);
      setCartCounter(0);
      setCartDetails([]);
    }
  }

  useEffect(() => {
    (async () => {
      let { data } = await getCart();
      if (data?.response?.data.statusMsg === "fail") {
        setCartDetails([]);
      } else {
        setCartDetails(data);
      }
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return <Loading />;
  if (
    !cartDetails ||
    cartDetails?.length === 0 ||
    cartDetails?.numOfCartItems <= 0
  ) {
    return <EmptyContent imageSrc={emptyCart} message={"your cart is empty"} />;
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Cart</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Cart" />
      </Helmet>
      <section className="cart my-5 py-5 px-3 px-md-0 ">
        <div className="container bg-main-light rounded-2 py-5 px-3 my-5 ">
          <h2 className="title-main text-center fw-bold mb-4">Shop Cart</h2>
          <div className="d-flex justify-content-between  flex-column flex-md-row mb-3">
            <p className="fw-semibold my-2">
              Total Cart Price:
              <span className="text-main mx-1">
                {cartDetails?.data?.totalCartPrice} EGP
              </span>
            </p>
            <p className="fw-semibold my-2">
              Total Number of Items:
              <span className="text-main mx-1">
                {cartDetails?.numOfCartItems}
              </span>
            </p>
          </div>
          {cartDetails?.data?.products.map((item) => {
            return (
              <CartItem
                key={item.product.id}
                item={item}
                setCartDetails={setCartDetails}
              />
            );
          })}

          <div className="d-flex justify-content-around align-items-center mt-4">
            <Link
              className="btn bg-main text-white"
              to={`/shippingAddress/${cartDetails?.data._id}`}
            >
              <i className="fa-solid fa-store"></i> Check Out
            </Link>
            <button className="btn btn-danger" onClick={clearUserCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
