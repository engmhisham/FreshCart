import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);

  let navigate = useNavigate();
  const ForgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      fotgotPassword(values);
    },
  });

  async function fotgotPassword(values) {
    setIsloading(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then((data) => {
        setIsloading(false);
        console.log(data);
        if (data.data.statusMsg === "success") {
          navigate("/auth/verify-reset-code");
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
        <title>FreshCart-Forgot Password</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Forgot-Password" />
      </Helmet>
      <div className="container-fluid my-5 py-5">
        <div className="container py-5 bg-main-light rounded-2">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6">
              <h3 className="mb-3 title-main">Forgot Password</h3>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
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
                    Reset my Password
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
