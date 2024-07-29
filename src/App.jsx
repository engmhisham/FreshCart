import React, { useContext, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Offline } from "react-detect-offline";

import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import NotFound from "./components/NotFound/NotFound";
import Products from "./components/Products/Products";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Cart from "./components/Cart/Cart";
import WishList from "./components/WishList/WishList";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import VerifyResetCode from "./components/Auth/VerifyResetCode/VerifyResetCode";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import { tokenContext } from "./Context/TokenContext";
import ProtectedAuth from "./ProtectedAuth/ProtectedAuth";
import { ToastContainer } from "react-toastify";
import Address from "./components/Address/Address";
import Allorders from "./components/Allorders/Allorders";
import ProductsByCategory from "./components/ProductsByCategory/ProductsByCategory";
import ProductsByBrand from "./components/ProductsByBrand/ProductsByBrand";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";

export default function App() {
  let { setToken } = useContext(tokenContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <HomePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products/category/:categoryName/:categoryId",
          element: (
            <ProtectedRoutes>
              <ProductsByCategory />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products/brand/:brandName/:brandId",
          element: (
            <ProtectedRoutes>
              <ProductsByBrand />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product-details/:slug/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetailsPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "shippingAddress/:cartId",
          element: (
            <ProtectedRoutes>
              <Address />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "order-details/:orderId",
          element: (
            <ProtectedRoutes>
              <OrderDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "whishlist",
          element: (
            <ProtectedRoutes>
              <WishList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedAuth>
              <SignIn />
            </ProtectedAuth>
          ),
        },
        {
          path: "signin",
          element: (
            <ProtectedAuth>
              <SignIn />
            </ProtectedAuth>
          ),
        },
        {
          path: "signup",
          element: (
            <ProtectedAuth>
              <SignUp />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <ProtectedAuth>
              <ForgotPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "verify-reset-code",
          element: (
            <ProtectedAuth>
              <VerifyResetCode />
            </ProtectedAuth>
          ),
        },
        {
          path: "reset-password",
          element: (
            <ProtectedAuth>
              <ResetPassword />
            </ProtectedAuth>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer theme="colored" autoClose="1000" />

      <Offline>
        <div className="offline bg-danger">
          <p className="mb-0">You're offline now!</p>
        </div>
      </Offline>
    </>
  );
}
