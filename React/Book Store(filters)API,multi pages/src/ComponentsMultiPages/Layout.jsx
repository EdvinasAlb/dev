import React, { useEffect, useState, createContext } from "react";
import About from "./About";
import Animals from "./Animals";
import Contacts from "./Conatcts";
import Home from "./Home";
import Loading from "./Loading";
import Page404 from "./Page404";

export const ParameterContext = createContext();

// Layout componen need change in to "ParameterContext.Provider" component

export default function Layout() {
  const [path, setPath] = useState(null);
  const [params, setParams] = useState([]);

  useEffect(
    (_) => {
      const hash = window.location.hash.split("/"); //Split for params
      setPath(hash.shift() || "#home"); //Shift for params
      setParams(hash);
      const onHashChange = (_) => {
        const hash = window.location.hash.split("/"); //Split for params
        setPath(hash.shift() || "#home"); //Shift for params
        setParams(hash);
      };

      window.addEventListener("hashchange", onHashChange);
      return (_) => {
        window.removeEventListener("hashchange", onHashChange);
      };
    },
    [setParams, setPath]
  );

  const routes = [
    { path: "#home", component: <Home /> },
    { path: "#animals", component: <Animals /> },
    { path: "#about", component: <About /> },
    { path: "#contacts", component: <Contacts /> },
    { path: null, component: <Loading /> },
  ];

  return (
    <ParameterContext.Provider value={{ params, path }}>
      {routes.find((routes) => routes.path === path)?.component || <Page404 />}
    </ParameterContext.Provider>
  );
}
