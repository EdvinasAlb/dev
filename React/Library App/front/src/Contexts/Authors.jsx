import { createContext, useReducer, useState } from "react";
import authorsReducer from "../Reducers/authorsReducer";
import useAuthors from "../Hooks/useAuthors";

export const Authors = createContext();

export const AuthorsProvider = ({ children }) => {
  const [authors, dispachAuthors] = useReducer(authorsReducer, null);
  const [deleteAuthor, setDeleteAuthor] = useState(null);
  const [editAuthor, setEditAuthor] = useState(null);

  const {
    storeAuthor,
    setStoreAuthor,
    updateAuthor,
    setUpdateAuthor,
    destroyAuthor,
    setDestroyAuthor,
  } = useAuthors(dispachAuthors);

  return (
    <Authors.Provider
      value={{
        authors,
        dispachAuthors,
        storeAuthor,
        setStoreAuthor,
        updateAuthor,
        setUpdateAuthor,
        destroyAuthor,
        setDestroyAuthor,
        deleteAuthor,
        setDeleteAuthor,
        editAuthor,
        setEditAuthor,
      }}
    >
      {children}
    </Authors.Provider>
  );
  //3
};
