import React from "react";
import { Link, NavLink } from "react-router-dom";
export default function Footer() {
  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <footer className="bg-main-light">
        <section className="bg-main-dark  border-bottom">
          <div className="container py-3 ">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-9 col-lg-8 mb-2 mb-md-0  text-center text-md-start">
                <h5 className="text-white">
                  Get connected with us on social networks:
                </h5>
              </div>
              <div className="col-md-3  col-lg-4 text-center text-md-start d-flex justify-content-around">
                <Link
                  to="https://www.facebook.com"
                  target="_blank"
                  className="text-white "
                >
                  <i className="fab fa-facebook-f"></i>
                </Link>
                <Link
                  to="https://www.twitter.com"
                  target="_blank"
                  className="text-white "
                >
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link
                  to="https://www.tiktok.com"
                  target="_blank"
                  className="text-white "
                >
                  <i className="fab fa-tiktok"></i>
                </Link>
                <Link
                  to="https://www.instagram.com"
                  target="_blank"
                  className="text-white "
                >
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link
                  to="https://www.linkedin.com"
                  target="_blank"
                  className="text-white "
                >
                  <i className="fab fa-linkedin"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container text-start mt-5">
            <div className="row p-3">
              <div className="col-sm-6  col-lg-3  mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Fresh Cart</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#0aad0a", height: 2 }}
                />
                <p>
                  Welcome to Fresh Cart, your ultimate destination for groceries
                  with a wide variety of categories to explore.
                </p>
              </div>

              <div className="col-sm-6 col-lg-2  mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#0aad0a", height: 2 }}
                />
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <NavLink
                      to="/home"
                      className="fw-semibold text-main"
                      onClick={scrollTop}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/products"
                      className="fw-semibold text-main"
                      onClick={scrollTop}
                    >
                      Products
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/categories"
                      className="fw-semibold text-main"
                      onClick={scrollTop}
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/brands"
                      className="fw-semibold text-main"
                      onClick={scrollTop}
                    >
                      Brands
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink
                      to="/allorders"
                      className="fw-semibold text-main"
                      onClick={scrollTop}
                    >
                      All Orders
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6  col-lg-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#0aad0a", height: 2 }}
                />
                <p>
                  <i className="fas fa-home me-3" /> Egypt, Cairo
                </p>
                <p>
                  <i className="fas fa-envelope me-3" /> info@example.com
                </p>
                <p>
                  <i className="fas fa-phone me-3" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fas fa-print me-3" /> + 01 234 567 89
                </p>
              </div>
              <div className="col-sm-6  col-lg-4 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">get app</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#0aad0a", height: 2 }}
                />
                <p>
                  We will send you a link, open it on your phone to download the
                  app.
                </p>
                <form className="my-4">
                  <div className="row  justify-content-center align-items-center">
                    <div className="col-12 col-md-8 pe-md-1 mb-1 mb-md-0  ">
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Email .."
                      />
                    </div>
                    <div className="col-12 col-md-4  ps-md-0">
                      <button
                        type="button"
                        className="btn bg-main  px-2 py-1 mx-auto d-block text-white w-100"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-0" />
        <section>
          <div className="container">
            <div className="text-center p-3">
              © 2024 Copyright
              <Link className="fw-semibold mx-1 text-main" to="/home">
                FrechCart
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
