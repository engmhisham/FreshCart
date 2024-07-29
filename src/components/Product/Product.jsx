import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../../Context/WishlistContext";
import "./Product.css";
import ModalImages from "../ModalImages/ModalImages";

export default function Product({ item, inSlid = false }) {
  const { setCartCounter, addToCart } = useContext(cartContext);
  const {
    wishlistProductsId,
    setWishlistProductsId,
    setWishlistCounter,
    addToWishlist,
    deleteFromWishlist,
  } = useContext(wishlistContext);
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingWishlist, setisLoadingWishlist] = useState(false);

  async function addProductToCart(productId) {
    setisLoading(true);
    let { data } = await addToCart(productId);
    if (data.status === "success") {
      setisLoading(false);
      toast.success("Product added successfully");
      setCartCounter(data.numOfCartItems);
    }
  }

  async function addProductToWishlist(productId) {
    setisLoadingWishlist(true);
    let { data } = await addToWishlist(productId);
    setisLoadingWishlist(false);
    if (data?.status === "success") {
      toast.success(data.message);
      setWishlistProductsId(data.data);
      setWishlistCounter(data.data.length);
    }
  }

  async function removeProductFromWishlist(productId) {
    setisLoadingWishlist(true);
    let { data } = await deleteFromWishlist(productId);
    setisLoadingWishlist(false);
    if (data?.status === "success") {
      toast.error(data.message);
      setWishlistProductsId(data.data);
      setWishlistCounter(data.data.length);
    }
  }

  return (
    <div className={inSlid ? "w-100" : "col-6 col-sm-4 col-md-3 col-lg-2 "}>
      <div className="product cursor-pointer rounded-3 p-2 overflow-hidden position-relative">
        <Link to={`/product-details/${item.slug}/${item._id}`}>
          <img
            src={item.imageCover}
            alt={item.title}
            className="d-block w-100"
            loading="lazy"
          />
          <h6 className="mt-2 mb-0 text-main font-sm">{item.category.name}</h6>
          <h5 className="fs-6 fw-bold">
            {item.title.split(" ").slice(0, 2).join(" ")}
          </h5>
          <div className="d-flex justify-content-between my-3">
            <div>{item.price} EGP</div>
            <div>
              <i className="fa-solid fa-star rating-color"></i>
              {item.ratingsAverage}
            </div>
          </div>
        </Link>
        <button
          className="btn btn-add bg-main text-white w-100 font-sm"
          onClick={() => addProductToCart(item._id)}
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
        {inSlid ? null : (
          <div className="overlay">
            {wishlistProductsId?.includes(item._id) ? (
              // Item is found in the wishlist
              <button
                className="btn btn-wishlist px-2 py-1 rounded-1 position-absolute"
                onClick={() => removeProductFromWishlist(item._id)}
              >
                {isLoadingWishlist ? (
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <i className="fa-solid fa-heart"></i>
                )}
              </button>
            ) : (
              // Item is not found in the wishlist
              <button
                className="btn btn-wishlist px-2 py-1 rounded-1 position-absolute"
                onClick={() => addProductToWishlist(item._id)}
              >
                {isLoadingWishlist ? (
                  <span
                    className="spinner-border spinner-border-sm "
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>
            )}

            {/* Button to open modal */}
            <button
              type="button"
              className="btn btn-view px-2 py-1 rounded-1 position-absolute mt-5"
              data-bs-toggle="modal"
              data-bs-target={`#modal${item._id}`}
            >
              <i className="fa-regular fa-image"></i>
            </button>
          </div>
        )}

        {/* Modal component */}
        <ModalImages
          item={item}
          addProductToCart={addProductToCart}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
