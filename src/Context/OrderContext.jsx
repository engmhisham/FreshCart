import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

export let orderContext = createContext();

async function getUserAllOrders() {
  let userId = localStorage.getItem("userId");
  if (!userId) return false;

  return axios
    .get(`${baseUrl}/orders/user/${userId}`)
    .then((data) => data)
    .catch((err) => err);
}

export default function OrderContextProvider({ children }) {
  const [allOrders, setAllOrders] = useState([]);
  return (
    <orderContext.Provider
      value={{ getUserAllOrders, allOrders, setAllOrders }}
    >
      {children}
    </orderContext.Provider>
  );
}
