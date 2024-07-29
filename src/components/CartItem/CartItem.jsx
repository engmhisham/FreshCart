import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import "./CartItem.css";

export default function CartItem({ item, setCartDetails }) {
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const { setCartCounter, deleteItem, updateQty } = useContext(cartContext);

  async function removeItemFromCart(productId) {
    setIsLoadingRemove(true);
    let { data } = await deleteItem(productId);
    if (data?.status === "success") {
      setIsLoadingRemove(false);
      setCartCounter(data.numOfCartItems);
      setCartDetails(data);
      toast.error("Product removed successfully");
    }
  }

  async function updateItemCountInCart(productId, count) {
    if (count <= 0) return removeItemFromCart(productId);

    setIsLoadingUpdate(true);
    let { data } = await updateQty(productId, count);
    if (data?.status === "success") {
      setIsLoadingUpdate(false);
      setCartCounter(data.numOfCartItems);
      setCartDetails(data);
      toast.success("Product updated successfully.");
    }
  }

  return (
    <div className="cartItem row align-items-center py-2 border-bottom">
      <div className="col-5 col-md-2 mx-auto mb-2 mb-md-0">
        <img
          src={item.product.imageCover}
          alt={item.product.title}
          className="d-block w-100 rounded-2"
        />
      </div>

      <div className="col-12 col-md-10 d-flex justify-content-between ">
        <div>
          <h6 className="title-main fw-bold mb-0">
            {item.product.title.split(" ").splice(0, 3).join(" ")}
          </h6>
          <p className="title-main ">Price: {item.price} EGP</p>
          <button
            className="btn p-1 "
            disabled={isLoadingRemove}
            onClick={() => removeItemFromCart(item.product.id)}
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
          <div className="input-group">
            <button
              className="btn btn-cartItem-update btn-sm"
              type="button"
              disabled={isLoadingUpdate}
              onClick={() => {
                updateItemCountInCart(item.product.id, item.count + 1);
              }}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
            <span className="title-main mx-2   mx-md-3 text-center py-1 fw-semibold">
              {item.count}
            </span>
            <button
              className="btn btn-cartItem-update btn-sm"
              type="button"
              disabled={item.count <= 1 || isLoadingUpdate ? true : false}
              onClick={() => {
                updateItemCountInCart(item.product.id, item.count - 1);
              }}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
