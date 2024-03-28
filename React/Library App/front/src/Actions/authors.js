import * as constants from "../Constants/authors";

//Show
export function getAuthors(authors) {
  return {
    type: constants.GET_AUTHORS_FROM_SERVER,
    payload: authors,
  };
}

//Create
export function storeAuthorAsTemp(author) {
  return {
    type: constants.CREATE_AUTHOR,
    payload: author,
  };
}

//Create
export function storeAuthorAsReal(response) {
  return {
    type: constants.CREATE_AUTHOR_REAL,
    payload: response,
  };
}

//Create
export function storeAuthorAsUndu(author) {
  return {
    type: constants.CREATE_AUTHOR_UNDU,
    payload: author,
  };
}

//Delete
export function deleteAuthorAsTemp(author) {
  return {
    type: constants.DELETE_AUTHOR,
    payload: author,
  };
}

//Delete
export function deleteAuthorAsReal(response) {
  return {
    type: constants.DELETE_AUTHOR_REAL,
    payload: response,
  };
}

//Delete
export function deleteAuthorAsUndo(author) {
  return {
    type: constants.DELETE_AUTHOR_UNDU,
    payload: author,
  };
}

//Edit
export function updateAuthorAsTemp(author) {
  return {
    type: constants.UPDATE_AUTHOR,
    payload: author,
  };
}

//Edit
export function updateAuthorAsReal(response) {
  return {
    type: constants.UPDATE_AUTHOR_REAL,
    payload: response,
  };
}

//Edit
export function updateAuthorAsUndu(author) {
  return {
    type: constants.UPDATE_AUTHOR_UNDU,
    payload: author,
  };
}
