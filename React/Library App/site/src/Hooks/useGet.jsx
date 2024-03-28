import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Router } from "../Contexts/Router";

export default function useGet(startUrl) {
  const SERVER_URL = "http://library.test";

  const { setErrorPageType } = useContext(Router);

  const [url, setUrl] = useState(startUrl);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(SERVER_URL + url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setErrorPageType("ups");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, setErrorPageType]);
  return { data, loading, setUrl };
}
