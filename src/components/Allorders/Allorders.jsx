/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import Loading from "./../Loading/Loading";
import EmptyContent from "../EmptyContent/EmptyContent";
import emptyOrders from "../../assets/images/emptyOrders.svg";
import Order from "../Order/Order";
import { orderContext } from "../../Context/OrderContext";
import { Helmet } from "react-helmet";

export default function Allorders() {
  let { getUserAllOrders, allOrders, setAllOrders } = useContext(orderContext);
  const [isloading, setIsLoading] = useState(true);

  async function getUserOrders() {
    let { data } = await getUserAllOrders();
    if (data) {
      let ordersArrayReverse = data.reverse(); // to get news orders  first
      setAllOrders(ordersArrayReverse);
    } else {
      setAllOrders([]);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  if (isloading) return <Loading />;
  if (!allOrders || allOrders?.length <= 0)
    return (
      <EmptyContent
        imageSrc={emptyOrders}
        message={"You don't have any orders yet."}
        details={
          "Start exploring our products and add items to your cart to place your first order!"
        }
      />
    );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {/* <title>{`FreshCart-${productsList[0].category?.name}`}</title> */}
        <title>FreshCart-All Orders</title>
        <meta
          name="keywords"
          content="FreshCart-Ecommerce-Categories-Products"
        />
      </Helmet>
      <section className="my-5 py-5 px-3 px-md-0">
        <div className="container bg-main-light rounded-2 py-5 px-4 my-5 ">
          <h2 className="title-main text-center fw-bold mb-4">All Orders</h2>
          <p className="fw-semibold my-2">
            Number of Orders:
            <span className="text-main mx-1">{allOrders?.length}</span>
          </p>
          {allOrders?.map((item) => {
            return <Order key={item._id} item={item} />;
          })}
        </div>
      </section>
    </>
  );
}
