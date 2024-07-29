import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";

export default function Address() {
  let { cartId } = useParams();
  const [isLodaing, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  let { payByCash, payByCreditCard, setCartCounter } = useContext(cartContext);
  let navigate = useNavigate();

  let shippingAddressSchema = Yup.object({
    details: Yup.string()
      .min(5, "details must be at least 5 characters")
      .max(100, "details must not exceed 60 characters")
      .required("address details is required"),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "phone must match the following: 01xxxxxxxxx"
      )
      .required("Phone number is required"),
    city: Yup.string().required("city is required"),
    paymentMethod: Yup.string()
      .oneOf(["cash", "credit_card"], "invalid payment method")
      .required("Please select a payment method"),
  });

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: "",
    },
    validationSchema: shippingAddressSchema,
    onSubmit: (values) => {
      createOrder(values);
    },
  });

  async function createOrder(values) {
    setIsloading(true);
    if (values.paymentMethod === "credit_card") {
      // handle pay order by credit card.
      let { data } = await payByCreditCard(cartId, values);
      if (data?.status === "success") {
        window.location.href = data.session.url;
      } else {
        setErrorMsg("error occurred while creating order.");
      }
      setIsloading(false);
    } else {
      // handle pay order by cash.
      let { data } = await payByCash(cartId, values);
      if (data?.status === "success") {
        setCartCounter(0);
        toast.success("you order successfully");
        navigate("/allorders");
      } else {
        setErrorMsg("error occurred while creating order.");
      }
      setIsloading(false);
    }
  }

  return (
    <div className="address my-5 py-5">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-9 col-md-6">
            <h3 className="mb-3 title-main">Shipping Address</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="details">Details:</label>
                <textarea
                  className="form-control"
                  name="details"
                  id="details"
                  cols="30"
                  rows="5"
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
                {formik.errors.details && formik.touched.details ? (
                  <div className="alert alert-danger my-2">
                    {formik.errors.details}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger my-2">
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="form-control"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.errors.city && formik.touched.city ? (
                  <div className="alert alert-danger my-2">
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>

              <div className="mb-4">
                <label htmlFor="paymentMethod">Select a Payment Method:</label>
                <select
                  name="paymentMethod"
                  className="form-select"
                  aria-label="Payment Method"
                  value={formik.values.paymentMethod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option disabled value="">
                    Payment Method
                  </option>
                  <option value="cash">
                    Pay with Cash at the time of delivery
                  </option>
                  <option value="credit_card">Pay with Credit Card</option>
                </select>
              </div>

              {errorMsg ? (
                <div className="alert alert-danger text-center">{errorMsg}</div>
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
                  Pay now
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
