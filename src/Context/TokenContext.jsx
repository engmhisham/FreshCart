import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const updateToken = (newToken) => {
    if (newToken) {
      setToken(newToken);
      const { id, name } = jwtDecode(newToken);
      setUserData({ id, name });
      localStorage.setItem("userName", name);
      localStorage.setItem("userId", id);
    }
  };

  return (
    <tokenContext.Provider
      value={{ token, setToken, updateToken, userData, setUserData }}
    >
      {children}
    </tokenContext.Provider>
  );
}
