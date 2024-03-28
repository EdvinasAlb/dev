import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants/main";
import { Router } from "../Contexts/Router";

export default function useAuthorsDropdown() {
  const [authorsDropdown, setAuthorsDropdown] = useState(null);
  const { setErrorPageType } = useContext(Router);

  useEffect(
    (_) => {
      axios
        .get(`${SERVER_URL}/authors`, { withCredentials: true })
        .then((res) => {
          setAuthorsDropdown(res.data);
        })
        .catch((err) => {
          setErrorPageType("ups");
        });
    },
    [setErrorPageType]
  );
  return { authorsDropdown };
}
