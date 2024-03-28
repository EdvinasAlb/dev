import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Router } from "../Contexts/Router";

export default function usePost() {
  const SERVER_URL = "http://library.test";

  const { setErrorPageType } = useContext(Router);

  const [postUrl, setPostUrl] = useState(null);
  const [sendData, setSendData] = useState(null);
  const [returnData, setReturnData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postUrl === null) return;
    axios
      .post(SERVER_URL + postUrl, sendData)
      .then((response) => {
        setReturnData(response.data);
      })
      .catch((error) => {
        setErrorPageType("ups");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postUrl, setErrorPageType]);
  return { setSendData, returnData, loading, setPostUrl };
}
