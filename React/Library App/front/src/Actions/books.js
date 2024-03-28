import * as constants from "../Constants/books";
//Show
export function getBooks(books) {
  return {
    type: constants.GET_BOOKS_FROM_SERVER,
    payload: books,
  };
}

//Create
export function storeBookAsTemp(book) {
  return {
    type: constants.CREATE_BOOK,
    payload: book,
  };
}

//Create
export function storeBookAsReal(response) {
  return {
    type: constants.CREATE_BOOK_REAL,
    payload: response,
  };
}

//Create
export function storeBookAsUndu(book) {
  return {
    type: constants.CREATE_BOOK_UNDU,
    payload: book,
  };
}

//Delete
export function deleteBookAsTemp(book) {
  return {
    type: constants.DELETE_BOOK,
    payload: book,
  };
}

//Delete
export function deleteBookAsReal(response) {
  return {
    type: constants.DELETE_BOOK_REAL,
    payload: response,
  };
}

//Delete
export function deleteBookAsUndo(book) {
  return {
    type: constants.DELETE_BOOK_UNDU,
    payload: book,
  };
}

//Edit
export function updateBookAsTemp(book) {
  return {
    type: constants.UPDATE_BOOK,
    payload: book,
  };
}

//Edit
export function updateBookAsReal(response) {
  return {
    type: constants.UPDATE_BOOK_REAL,
    payload: response,
  };
}

//Edit
export function updateBookAsUndu(book) {
  return {
    type: constants.UPDATE_BOOK_UNDU,
    payload: book,
  };
}
