import React from "react";

export default function EmptyContent({ imageSrc = "", message, details = "" }) {
  return (
    <section className="cart container my-5 py-5  d-flex  align-items-center justify-content-center ">
      <div className="row ">
        <div className="col-md-7 mx-auto">
          <div className="w-100">
            <h4 className="my-4 text-center text-capitalize fw-bold">
              {message}
            </h4>
            {details ? <p className="text-center">{details}</p> : null}
          </div>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="empty cart"
              className="d-block mt-2 mx-auto w-100"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
