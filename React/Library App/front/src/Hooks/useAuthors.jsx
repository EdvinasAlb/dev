import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants/main";
import * as a from "../Actions/authors";
import { v4 as uuidv4 } from "uuid";
import { MessagesContext } from "../Contexts/Messages";
import { Router } from "../Contexts/Router";

export default function useAuthors(dispachAuthors) {
  const [storeAuthor, setStoreAuthor] = useState(null);
  const [updateAuthor, setUpdateAuthor] = useState(null);
  const [destroyAuthor, setDestroyAuthor] = useState(null);

  const { addMessage } = useContext(MessagesContext);
  const { setErrorPageType } = useContext(Router);

  //Store
  useEffect(
    (_) => {
      axios
        .get(`${SERVER_URL}/authors`, { withCredentials: true })
        .then((res) => {
          dispachAuthors(a.getAuthors(res.data));
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
    [dispachAuthors, setErrorPageType]
  );

  //Create
  useEffect(
    (_) => {
      if (null !== storeAuthor) {
        const uuid = uuidv4();
        dispachAuthors(a.storeAuthorAsTemp({ ...storeAuthor, id: uuid }));
        axios
          .post(
            `${SERVER_URL}/authors`,
            { ...storeAuthor, id: uuid },
            { withCredentials: true }
          )
          .then((res) => {
            setStoreAuthor(null);
            dispachAuthors(a.storeAuthorAsReal(res.data));
            addMessage(res.data.message);
          })
          .catch((err) => {
            dispachAuthors(a.storeAuthorAsUndu({ ...storeAuthor, id: uuid }));
            setStoreAuthor(null);
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [storeAuthor, dispachAuthors, addMessage]
  );

  //Edit
  useEffect(
    (_) => {
      if (null !== updateAuthor) {
        dispachAuthors(a.updateAuthorAsTemp(updateAuthor));
        axios
          .put(`${SERVER_URL}/authors/${updateAuthor.id}`, updateAuthor, {
            withCredentials: true,
          })
          .then((res) => {
            setUpdateAuthor(null);
            dispachAuthors(a.updateAuthorAsReal(res.data));
            addMessage(res.data.message);
          })
          .catch((err) => {
            setUpdateAuthor(null);
            dispachAuthors(a.updateAuthorAsUndu(updateAuthor));
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [updateAuthor, destroyAuthor, addMessage, dispachAuthors]
  );

  //Delete
  useEffect(
    (_) => {
      if (null !== destroyAuthor) {
        dispachAuthors(a.deleteAuthorAsTemp(destroyAuthor));
        axios
          .delete(`${SERVER_URL}/authors/${destroyAuthor.id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setDestroyAuthor(null);
            dispachAuthors(a.deleteAuthorAsReal(res.data));
            addMessage(res.data.message);
          })
          .catch((err) => {
            dispachAuthors(a.deleteAuthorAsUndo(destroyAuthor));
            setDestroyAuthor(null);
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [destroyAuthor, dispachAuthors, addMessage]
  );
  return {
    storeAuthor,
    setStoreAuthor,
    updateAuthor,
    setUpdateAuthor,
    destroyAuthor,
    setDestroyAuthor,
  };
}
