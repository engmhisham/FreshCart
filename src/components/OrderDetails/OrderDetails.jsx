/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderContext } from "../../Context/OrderContext";
import Loading from "../Loading/Loading";
import EmptyContent from "../EmptyContent/EmptyContent";
import emptyOrders from "../../assets/images/emptyOrders.svg";
import "./OrderDetails.css";
import { Helmet } from "react-helmet";

export default function OrderDetails() {
  let { orderId } = useParams();
  const [isloading, setIsLoading] = useState(true);
  let { getUserAllOrders, allOrders, setAllOrders } = useContext(orderContext);
  const [order, setOrder] = useState({});

  async function getSpecificOrder() {
    let { data } = await getUserAllOrders();
    if (data) {
      setAllOrders(data);
      let orderFounded = data.filter((order) => order._id === orderId);
      setOrder(...orderFounded);
    } else {
      setAllOrders([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getSpecificOrder();
  }, []);

  if (isloading) return <Loading />;
  if (!allOrders || allOrders?.length <= 0)
    return (
      <EmptyContent
        imageSrc={emptyOrders}
        message={`If no orders are found at the moment, please check back later.`}
        details={
          " We couldn't find any orders right now. Please try again later."
        }
      />
    );
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Order Details</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Order-Details" />
      </Helmet>
      <section className="order-details my-5 py-5 px-3 px-md-0 ">
        <div className="container bg-main-light rounded-2 py-5 px-4 my-5 ">
          <h2 className="title-main text-center fw-bold mb-4">Order Details</h2>
          <div className="row my-3 py-3 px-2 border rounded-2 shadow-sm d-flex justify-content-center  bg-light">
            <div className="col-12">
              <p className="fw-semibold my-2">
                Order Id:
                <span className="text-main mx-1">{order?.id}</span>
              </p>
              <p className="fw-semibold my-2">
                Name:
                <span className="text-main mx-1">{order?.user.name}</span>
              </p>
              <p className="fw-semibold my-2">
                Shipping Address
                <br /> - city:
                <span className="text-main mx-1">
                  {order?.shippingAddress.city}
                </span>
                <br /> - details:
                <span className="text-main mx-1">
                  {order?.shippingAddress.details}
                </span>
                <br /> - phone:
                <span className="text-main mx-1">
                  {order?.shippingAddress.phone}
                </span>
              </p>
              <p className="fw-semibold my-2">
                Order Date:
                <span className="text-main mx-1">
                  {new Date(order?.createdAt).toLocaleString()}
                </span>
              </p>

              <p className="fw-semibold my-2">
                Total Price:
                <span className="text-main mx-1">
                  {order?.totalOrderPrice} EGP
                </span>
              </p>
              <p className="fw-semibold my-2">
                Payment Method:
                <span className="text-main mx-1">
                  {order?.paymentMethodType}
                </span>
              </p>
              <p className="fw-semibold my-2">
                Delivered:
                <span className="text-main mx-1">
                  {order?.isDelivered ? "Yes" : "No"}
                </span>
              </p>
              <p className="fw-semibold my-2">
                Paid:
                <span className="text-main mx-1">
                  {order?.isPaid ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <span className="fw-bold">Items: </span>
              </p>
              {order?.cartItems.map((el, index) => (
                <div
                  key={index}
                  className="row mb-3 p-3 justify-content-center  align-items-center border-bottom"
                >
                  <div className="col-md-2">
                    <img
                      src={el.product.imageCover}
                      alt={el.product.title}
                      className=" me-3 rounded-2 "
                      width={60}
                      height={60}
                      loading="lazy"
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="title-main font-sm  fw-semibold mt-2 mt-md-0">
                      {el.product.title}
                    </h6>
                  </div>
                  <div className="col-md-4 text-center">
                    <p className="mb-1 font-sm fw-semibold ">
                      price: {el.price} EGP
                    </p>
                    <p className="mb-1 font-sm fw-semibold">
                      Count: {el.count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
