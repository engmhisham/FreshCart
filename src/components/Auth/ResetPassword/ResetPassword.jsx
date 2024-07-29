import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { tokenContext } from "../../../Context/TokenContext";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [isLodaing, setIsloading] = useState(false);
  let { updateToken } = useContext(tokenContext);

  let navigate = useNavigate();

  const ForgotPasswordSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-zA-Z0-9]{7,}$/,
        "New Password must start with an uppercase letter and be at least 8 characters long"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: (values) => {
      resetPassword(values);
    },
  });

  async function resetPassword(values) {
    setIsloading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((data) => {
        setIsloading(false);
        console.log(data);

        if (data.data.token) {
          navigate("/auth/signin");
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log(error.response);
        setErrorMsg(error.response.data.message);
      });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>FreshCart-Reset Password</title>
        <meta name="keywords" content="FreshCart-Ecommerce-Reset-Password" />
      </Helmet>
      <div className="container-fluid my-5  py-5">
        <div className="container py-5  bg-main-light rounded-2">
          <div className="row justify-content-center">
            <div className="col-sm-9 col-md-6">
              <h3 className="mb-3 title-main">Reset Password</h3>

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

                <div className="mb-3 ">
                  <label htmlFor="newPassword">New-Password:</label>
                  <div className="position-relative">
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      value={formik.values.newPassword}
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

                  {formik.errors.newPassword && formik.touched.newPassword ? (
                    <div className="alert alert-danger my-2">
                      {formik.errors.newPassword}
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
                    Reset
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
