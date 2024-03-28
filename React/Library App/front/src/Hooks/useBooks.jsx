import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../Constants/main";
import * as a from "../Actions/books";
import { v4 as uuidv4 } from "uuid";
import { Router } from "../Contexts/Router";

import { MessagesContext } from "../Contexts/Messages";

export default function useBooks(dispachBooks) {
  const [storeBook, setStoreBook] = useState(null);
  const [updateBook, setUpdateBook] = useState(null);
  const [destroyBook, setDestroyBook] = useState(null);

  const { addMessage } = useContext(MessagesContext);
  const { setErrorPageType } = useContext(Router);

  //Show
  useEffect(
    (_) => {
      axios
        .get(`${SERVER_URL}/books`, { withCredentials: true })
        .then((res) => {
          dispachBooks(a.getBooks(res.data));
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
    [dispachBooks, setErrorPageType]
  );

  //create
  useEffect(
    (_) => {
      if (null !== storeBook) {
        const uuid = uuidv4();
        dispachBooks(a.storeBookAsTemp({ ...storeBook, id: uuid }));
        const withOutAuthor = { ...storeBook };
        delete withOutAuthor.author; //Dont't send Book to server
        axios
          .post(
            `${SERVER_URL}/books`,
            { ...withOutAuthor, id: uuid },
            { withCredentials: true }
          )
          .then((res) => {
            dispachBooks(a.storeBookAsReal(res.data));
            setStoreBook(null);
            addMessage(res.data.message);
          })
          .catch((err) => {
            dispachBooks(a.storeBookAsUndu({ id: uuid }));
            setStoreBook(null);
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [storeBook, dispachBooks, addMessage]
  );

  //Delete
  useEffect(
    (_) => {
      if (null !== destroyBook) {
        dispachBooks(a.deleteBookAsTemp(destroyBook));
        axios
          .delete(`${SERVER_URL}/books/${destroyBook.id}`, {
            withCredentials: true,
          })
          .then((res) => {
            setDestroyBook(null);
            dispachBooks(a.deleteBookAsReal(res.data));
            addMessage(res.data.message);
          })
          .catch((err) => {
            dispachBooks(a.deleteBookAsUndo(destroyBook)); //undu delete
            setDestroyBook(null);
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [destroyBook, dispachBooks, addMessage]
  );

  //Edit
  useEffect(
    (_) => {
      if (null !== updateBook) {
        dispachBooks(a.updateBookAsTemp(updateBook));
        const withOutAuthor = { ...updateBook };
        delete withOutAuthor.author;
        axios
          .put(`${SERVER_URL}/books/${updateBook.id}`, withOutAuthor, {
            withCredentials: true,
          })
          .then((res) => {
            setUpdateBook(null);
            dispachBooks(a.updateBookAsReal(res.data));
            addMessage(res.data.message);
          })
          .catch((err) => {
            setUpdateBook(null);
            dispachBooks(a.updateBookAsUndu(updateBook));
            err?.response?.data?.message &&
              addMessage(err.response.data.message);
          });
      }
    },
    [updateBook, dispachBooks, addMessage]
  );

  return {
    storeBook,
    setStoreBook,
    updateBook,
    setUpdateBook,
    destroyBook,
    setDestroyBook,
  };
}
