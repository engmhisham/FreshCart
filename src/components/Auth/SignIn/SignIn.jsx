import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { tokenContext } from "../../../Context/TokenContext";
import { Helmet } from "react-helmet";

export default function SignIn() {
  let { updateToken } = useContext(tokenContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);

  let navigate = useNavigate();
  const SignupSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "Password must start with an uppercase letter and be at least 8 characters long"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  async function login(values) {
    setIsloading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((data) => {
        setIsloading(false);
        if (data.data.message === "success") {
          // save token in local storage
          localStorage.setItem("token", data.data.token);
          // set token in context
          updateToken(data.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setIsloading(false);
        setErrorMsg(error.response.data.message);
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-signin</title>
        <meta name="keywords" content="FreshCart-Ecommerce-signin-login" />
      </Helmet>
      <div className="signin container-fluid my-5 py-5">
        <div className="container py-5 bg-main-light rounded-2">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6">
              <h3 className="mb-3 title-main">Login Now</h3>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-danger my-2">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div className="mb-2 ">
                  <label htmlFor="password">Password:</label>
                  <div className="position-relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="form-control "
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      type="button"
                      className="btn text-color border-0 position-absolute top-50 end-0 translate-middle-y"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          showPassword ? "fa-eye-slash text-main" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>

                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger my-2">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="rePassword">Re-password:</label>
                  <div className="position-relative">
                    <input
                      id="rePassword"
                      name="rePassword"
                      type={showRePassword ? "text" : "password"}
                      className="form-control"
                      value={formik.values.rePassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      type="button"
                      className="btn text-color border-0 position-absolute top-50 end-0 translate-middle-y"
                      onClick={() => {
                        setShowRePassword(!showRePassword);
                      }}
                    >
                      <i
                        className={`fa-regular ${
                          showRePassword ? "fa-eye-slash text-main" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>

                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <div className="alert alert-danger my-2">
                      {formik.errors.rePassword}
                    </div>
                  ) : null}
                </div>

                <p className="mb-3 font-sm ">
                  Forgot your password?
                  <Link
                    to="/auth/forgot-password"
                    className="text-main ms-1 fw-bold "
                  >
                    Reset it here
                  </Link>
                </p>

                {errorMsg ? (
                  <div className="alert alert-danger text-center">
                    {errorMsg}
                  </div>
                ) : null}

                {isLodaing ? (
                  <button
                    type="submit"
                    className="btn bg-main text-white"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn bg-main text-white"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    login
                  </button>
                )}
                <p className=" my-4 text-center">
                  Don't have an account yet?
                  <Link to="/auth/signup" className="text-main ms-1 fw-bold">
                    Signup
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
