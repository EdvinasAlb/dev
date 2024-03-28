import axios from "axios";
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from "../Constants/main";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../Contexts/Auth";
import { MessagesContext } from "../Contexts/Messages";

export default function useLogin() {
  const [inputs, setInputs] = useState(null);

  const { login, setuser } = useContext(Auth);
  const { addMessage } = useContext(MessagesContext);

  //Login
  useEffect(() => {
    if (null !== inputs) {
      axios
        .post(`${SERVER_URL}/login`, inputs, { withCredentials: true })
        .then((res) => {
          login(res.data.name, res.data.role, res.data.id);
          window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
          addMessage({
            type: "success",
            text: "Welcom to the Library." + res.data.name,
          });
        })
        .catch((error) => {
          if (!error.response) {
            addMessage({
              type: "danger",
              message: "Server error.",
            });
          } else {
            addMessage({
              type: "danger",
              text: error.response.data.message,
            });
          }
        });
    }
  }, [inputs, addMessage, login]);

  const logout = (_) => {
    axios
      .post(`${SERVER_URL}/logout`, {}, { withCredentials: true })
      .then((res) => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("role");
        window.localStorage.removeItem("id");
        setuser(null);
        window.location.href = "#login";
        addMessage(res.data.message);
      })
      .catch((error) => {
        if (!error.response) {
          addMessage({ type: "danger", text: "Server error" });
        } else {
          addMessage({ type: "danger", text: error.response.data.message });
        }
      });
  };

  return { setInputs, logout };
}
