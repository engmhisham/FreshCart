import React from "react";
import Slider from "react-slick";

export default function ModalImages({ item, addProductToCart, isLoading }) {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  function addToCart(productId) {
    addProductToCart(productId);
  }

  return (
    <>
      <div
        className="modal fade"
        id={`modal${item._id}`} // Dynamic modal ID based on item ID
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {item.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Slider {...settings} className="mb-5">
                {item.images.map((img, index) => (
                  <div key={index} className="p-1">
                    <img
                      src={img}
                      alt={item.name}
                      className="d-block mx-auto rounded-2 object-fit-cover"
                      height={300}
                    />
                  </div>
                ))}
              </Slider>

              <h5 className="text-main fs-6 fw-bold">
                {item.title.split(" ").slice(0, 2).join(" ")}
              </h5>
              <p>{item.description.split(" ").slice(0, 5).join(" ") + "..."}</p>
              <div className="d-flex justify-content-between my-3">
                <div>{item.price} EGP</div>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>
                  {item.ratingsAverage}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                className="btn bg-main text-white  font-sm"
                onClick={() => addToCart(item._id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cart-plus me-1"></i> Add Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
