import { createContext, useEffect, useState } from "react";
import axios from "axios";

const BOOK_URL = "https://in3.dev/knygos/";
const TYPES_URL = "https://in3.dev/knygos/types/";

export const BooksData = createContext();

export const BooksDataProvider = ({ children }) => {
  const [books, setBooks] = useState(null);
  const [types, setTypes] = useState(null);
  const [sort, setSort] = useState("default");
  const [filterCat, setFilterCat] = useState("all");
  const [filterMin, setFliterMin] = useState(0);
  const [filterMax, setFliterMax] = useState(0);

  useEffect(
    (_) => {
      axios
        .get(BOOK_URL)
        .then((res) =>
          setBooks(
            res.data.map((book, i) => ({ ...book, row: i, show: new Set() }))
          )
        );
    },
    [setBooks]
  );

  useEffect(
    (_) => {
      const localTypes = localStorage.getItem("types"); //Move types to LS

      if (localTypes) {
        setTypes(JSON.parse(localTypes));
        return; //Move types to LS
      }

      axios.get(TYPES_URL).then((res) => {
        setTypes(res.data);
        localStorage.setItem("types", JSON.stringify(res.data)); //Move types to LS
      });
    },
    [setTypes]
  );

  useEffect(
    (_) => {
      setBooks((b) => {
        if (null === b) {
          return null;
        }
        const sorted = [...b];
        switch (sort) {
          case "price_asc":
            sorted.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            sorted.sort((a, b) => b.price - a.price);
            break;
          case "title_asc":
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "title_desc":
            sorted.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            sorted.sort((a, b) => a.row - b.row);
            break;
        }
        return sorted;
      });
    },
    [sort, setBooks]
  );

  useEffect(
    (_) => {
      setBooks((b) => {
        if (null === b) {
          return null;
        }
        return b.map((book) => {
          if (filterCat === "all") {
            book.show.delete("cat");
            return book;
          } else if (book.type === +filterCat) {
            book.show.delete("cat");
          } else {
            book.show.add("cat");
          }
          return book;
        });
      });
    },
    [filterCat, setBooks]
  );

  useEffect(
    (_) => {
      if (filterMin > filterMax) {
        setFliterMax(filterMin);
      }
      if (filterMax < filterMin) {
        setFliterMin(filterMax);
      }
      setBooks((b) => {
        if (null === b) {
          return null;
        }
        return b.map((book) => {
          if (book.price >= filterMin && book.price <= filterMax) {
            book.show.delete("price");
          } else {
            book.show.add("price");
          }
          return book;
        });
      });
    },
    [filterMin, filterMax, setBooks]
  );

  return (
    <BooksData.Provider
      value={{
        books,
        types,
        setSort,
        sort,
        filterCat,
        setFilterCat,
        filterMin,
        setFliterMin,
        filterMax,
        setFliterMax,
      }}
    >
      {children}
    </BooksData.Provider>
  );
};
