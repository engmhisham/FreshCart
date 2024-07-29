import React, { useContext, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import { toast } from "react-toastify";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";

export default function WishListItem({ item, setwishList, wishList }) {
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const { setWishlistProductsId, setWishlistCounter, deleteFromWishlist } =
    useContext(wishlistContext);
  const { setCartCounter, addToCart } = useContext(cartContext);

  async function addProductToCart(productId) {
    setIsLoadingAdd(true);
    let { data } = await addToCart(productId);
    if (data.status === "success") {
      setIsLoadingAdd(false);
      toast.success("Product added successfully");
      setCartCounter(data.numOfCartItems);
    }
  }

  async function removeProductFromWishlist(productId) {
    setIsLoadingRemove(true);
    let { data } = await deleteFromWishlist(productId);
    setIsLoadingRemove(false);
    if (data?.status === "success") {
      toast.error(data.message);
      setWishlistProductsId(data.data);
      setWishlistCounter(data.data.length);

      let newList = wishList.filter((item) => item.id !== productId);
      setwishList(newList);
    }
  }

  return (
    <div className="cartItem row align-items-center py-2 border-bottom">
      <div className="col-5 col-sm-2 mx-auto mb-2 mb-md-0">
        <img
          src={item.imageCover}
          alt={item.title}
          className="d-block w-100 rounded-2"
        />
      </div>

      <div className="col-sm-10 d-flex justify-content-between ">
        <div>
          <Link to={`/product-details/${item.slug}/${item._id}`}>
            <h6 className="title-main fw-bold mb-0">
              {item.title.split(" ").splice(0, 3).join(" ")}
            </h6>
          </Link>
          <p className="title-main ">Price: {item.price} EGP</p>
          <button
            className="btn p-1 "
            disabled={isLoadingRemove}
            onClick={() => removeProductFromWishlist(item._id)}
          >
            {isLoadingRemove ? (
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
                <i className="fa-regular fa-trash-can text-danger"></i> remove
              </>
            )}
          </button>
        </div>
        <div className="align-self-center">
          <button
            className="btn btn-add bg-main text-white w-100 font-sm"
            onClick={() => addProductToCart(item._id)}
            disabled={isLoadingAdd}
          >
            {isLoadingAdd ? (
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
                <i className="fa-solid fa-cart-plus me-1"></i> Add To Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
