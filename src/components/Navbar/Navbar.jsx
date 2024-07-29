import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
export default function Navbar() {
  const [navToggle, setNavToggle] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const userName = localStorage.getItem("userName"); // Retrieve the user's name from localStorage
  let { token, setToken } = useContext(tokenContext);
  let { cartCounter, setCartCounter, getCart } = useContext(cartContext);
  let {
    wishlistCounter,
    setWishlistCounter,
    getWishlist,
    setWishlistProductsId,
  } = useContext(wishlistContext);

  let navigate = useNavigate();

  function handleNavToggle() {
    setNavToggle(!navToggle);
  }

  function handleNavLinkClick() {
    setNavToggle(false); // Close the navbar when a link is clicked
  }
  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  function logOut() {
    localStorage.clear();
    setToken(null);
    navigate("/auth/signin");
  }

  useEffect(() => {
    if (token) {
      (async () => {
        let cartResponse = await getCart();
        if (cartResponse?.response?.data?.statusMsg === "fail") {
          setCartCounter(0);
        } else {
          setCartCounter(cartResponse?.data?.numOfCartItems);
        }

        let wishlistResponse = await getWishlist();
        if (wishlistResponse?.data?.status === "success") {
          setWishlistCounter(wishlistResponse?.data?.count);
          // Extracting IDs from the array of objects
          const wishlistIds = wishlistResponse?.data?.data.map(
            (item) => item.id
          );
          // Setting the array of IDs in the state
          setWishlistProductsId(wishlistIds);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <nav className="navbar navbar-expand-md bg-main-light fixed-top border-bottom">
      <div className="container py-2">
        <NavLink className="navbar-brand mb-md-2 " to="/home">
          <img src={logo} alt="Fresh-Cart Logo" className="w-100" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={navToggle}
          aria-label="Toggle navigation"
          onClick={handleNavToggle}
        >
          <i
            className={`fa-solid ${navToggle ? "fa-xmark" : "fa-bars"} fs-4`}
          ></i>
        </button>
        <div
          className={`collapse navbar-collapse ${navToggle ? "show" : ""}`}
          id="navbarSupportedContent"
        >
          {token ? (
            <>
              <ul className="navbar-nav mx-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/home"
                    onClick={handleNavLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/products"
                    onClick={handleNavLinkClick}
                  >
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/categories"
                    onClick={handleNavLinkClick}
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/brands"
                    onClick={handleNavLinkClick}
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link position-relative"
                    to="/cart"
                    onClick={handleNavLinkClick}
                  >
                    <span className="d-md-none">Cart</span>
                    <i className="fa-solid fa-cart-shopping ms-2 cart-icon"></i>
                    {cartCounter ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge  rounded-pill bg-main">
                        {cartCounter}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link position-relative"
                    to="/whishlist"
                    onClick={handleNavLinkClick}
                  >
                    <span className="d-md-none">Wishlist</span>
                    <i className="fa-solid fa-heart ms-2 wish-icon"></i>
                    {wishlistCounter ? (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                        {wishlistCounter}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              </ul>
            </>
          ) : null}
          <ul className="navbar-nav ms-auto mb-2 mb-md-0">
            {token ? (
              <>
                <div className="vr d-none d-lg-block"></div>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle "
                    onClick={toggleDropdown}
                    aria-expanded={dropdownVisible ? "true" : "false"}
                  >
                    <i className="fa-solid fa-user user-icon"></i> Hi,
                    <span className="fw-semibold text-main">
                      {userName ? userName.split(" ")[0] : ""}
                    </span>
                  </button>
                  <ul
                    className={`dropdown-menu ${dropdownVisible ? "show" : ""}`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/allorders"
                        onClick={() => {
                          toggleDropdown();
                          handleNavLinkClick();
                        }}
                      >
                        All-Orders
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          toggleDropdown();
                          handleNavLinkClick();
                          logOut();
                        }}
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/auth/signin"
                    onClick={handleNavLinkClick}
                  >
                    signIn
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/auth/signup"
                    onClick={handleNavLinkClick}
                  >
                    signUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
