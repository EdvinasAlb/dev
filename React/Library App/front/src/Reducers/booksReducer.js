import * as constants from "../Constants/books";

export default function booksReducer(state, action) {
  let newState = structuredClone(state ? state : []);

  let book = null;

  switch (action.type) {
    //Show
    case constants.GET_BOOKS_FROM_SERVER:
      newState = action.payload.map((book) => {
        book.author = {};
        book.author.name = book.name;
        book.author.surname = book.surname;
        delete book.name;
        delete book.surname;
        return book;
      });
      break;

    //Create
    case constants.CREATE_BOOK:
      newState.unshift({ ...action.payload, temp: true });
      break;

    //Create
    case constants.CREATE_BOOK_REAL:
      book = newState.find((book) => book.id === action.payload.uuid);

      if (book) {
        delete book.temp;
        book.id = action.payload.id;
      }
      break;

    //Create
    case constants.CREATE_BOOK_UNDU:
      newState = newState.filter((book) => book.id !== action.payload.id);
      break;

    //Delete
    case constants.DELETE_BOOK:
      book = newState.find((book) => book.id === action.payload.id);
      if (book) {
        book.deleted = true;
      }
      break;

    //Delete
    case constants.DELETE_BOOK_REAL:
      newState = newState.filter((book) => book.id !== action.payload.id);
      break;

    //Delete
    case constants.DELETE_BOOK_UNDU:
      book = newState.find((book) => book.id === action.payload.id);
      if (book) {
        delete book.deleted;
      }
      break;

    //Update
    //Begining
    case constants.UPDATE_BOOK:
      book = newState.find((book) => book.id === action.payload.id); //Find book
      if (book) {
        for (let key in action.payload) {
          book[key] = action.payload[key];
        }
        // book.id = action.payload.book.id; // ^ For in cikle
        // book.name = action.payload.book.name;
        // book.surname = action.payload.book.surname;
        // book.nickname = action.payload.book.nickname;
        // book.born = action.payload.book.born;
        book.temp = true;
      }
      break;

    //Update
    case constants.UPDATE_BOOK_REAL:
      book = newState.find((book) => book.id === action.payload.id);
      if (book) {
        delete book.temp;
        delete book.old;
      }
      break;

    //Update
    case constants.UPDATE_BOOK_UNDU:
      book = newState.find((book) => book.id === action.payload.id);
      if (book) {
        for (let key in action.payload.old) {
          book[key] = action.payload.old[key];
        }
        delete book.temp;
        delete book.old;
      }
      break;
    default:
  }
  return newState;
}
