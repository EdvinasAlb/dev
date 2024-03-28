import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants/main";
import { Router } from "../Contexts/Router";

export const Home = createContext();

export const HomeProvider = ({ children }) => {
  const [home, setHome] = useState(null);
  const { setErrorPageType } = useContext(Router);
  //Show stats
  useEffect(
    (_) => {
      axios
        .get(`${SERVER_URL}/stats`, { withCredentials: true })
        .then((res) => {
          setHome(res.data);
        })
        .catch((err) => {
          if (err?.response?.status === 401) {
            if (err.response.data.type === "login") {
              window.location.href = "#login";
            } else {
              setErrorPageType(401);
            }
          } else {
            setErrorPageType(503);
          }
        });
    },
    [setHome, setErrorPageType]
  );

  return (
    <Home.Provider
      value={{
        home,
        setHome,
      }}
    >
      {children}
    </Home.Provider>
  );
  //3
};
