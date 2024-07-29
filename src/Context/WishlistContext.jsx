import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

export let wishlistContext = createContext();

async function addToWishlist(productId) {
  return axios
    .post(
      `${baseUrl}/wishlist`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err);
}
async function deleteFromWishlist(productId) {
  return axios
    .delete(
      `${baseUrl}/wishlist/${productId}`,

      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    )
    .then((data) => data)
    .catch((err) => err);
}
async function getWishlist() {
  return axios
    .get(`${baseUrl}/wishlist`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    })
    .then((data) => data)
    .catch((err) => err);
}

export default function WishlistContextProvider({ children }) {
  const [wishlistCounter, setWishlistCounter] = useState(0);
  const [wishlistProductsId, setWishlistProductsId] = useState([]);

  return (
    <wishlistContext.Provider
      value={{
        wishlistCounter,
        setWishlistCounter,
        wishlistProductsId,
        setWishlistProductsId,
        getWishlist,
        addToWishlist,
        deleteFromWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
