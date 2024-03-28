import { createContext, useEffect, useState } from "react";
import { MessagesProvider } from "./Messages.jsx";

import Page404 from "../Pages/Page404";
import AuthorsIndex from "../Pages/Authors/index.jsx";
import BookIndex from "../Pages/Books/index.jsx";
import HeroIndex from "../Pages/Heroes/index.jsx";
import HomeIndex from "../Pages/Home/index.jsx";
import Login from "../Pages/Auth/Login.jsx";
import Page503 from "../Pages/Page503";
import Page401 from "../Pages/Page401";
import PageUps from "../Pages/PageUps.jsx";

export const Router = createContext();

export const RouterProvider = () => {
  //Hash
  const [route, setRoute] = useState((_) => {
    const hash = window.location.hash || "#home";
    return hash.split("/").shift();
  });
  const [params, setParams] = useState((_) => {
    const hash = window.location.hash.split("/");
    hash.shift();
    return hash;
  });

  const [errorPageType, setErrorPageType] = useState(null);

  useEffect(() => {
    const handleHashChange = (_) => {
      const hash = window.location.hash.split("/");
      setRoute(hash.shift());
      setParams(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return (_) => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  //Routes
  const routes = [
    { path: "#home", component: <HomeIndex /> },
    { path: "#authors", component: <AuthorsIndex /> },
    { path: "#books", component: <BookIndex /> },
    { path: "#heroes", component: <HeroIndex /> },
    { path: "#login", component: <Login /> },
  ];

  // Error Pages
  const errorPages = [
    { type: 503, component: <Page503 /> },
    { type: 401, component: <Page401 /> },
    { type: "ups", component: <PageUps /> },
  ];

  const routeComponent = routes.find((r) => r.path === route)?.component || (
    <Page404 />
  );
  const errorComponent =
    errorPages.find((e) => e.type === errorPageType)?.component || null;

  return (
    <Router.Provider value={{ params, setErrorPageType }}>
      <MessagesProvider> {errorComponent || routeComponent}</MessagesProvider>
    </Router.Provider>
  );
};
