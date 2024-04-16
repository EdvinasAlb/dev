import { useContext, useEffect, useState } from "react";
import { BooksData } from "./BooksData";

export default function Top() {
  const sorts = [
    { id: "default", title: "Latest on top" },
    { id: "price_asc", title: "Cheapest on top" },
    { id: "price_desc", title: "Most expensive on top" },
    { id: "title_asc", title: "A-Z" },
    { id: "title_desc", title: "Z-A" },
  ];

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const {
    setSort,
    sort,
    types,
    filterCat,
    setFilterCat,
    books,
    filterMin,
    setFliterMin,
    filterMax,
    setFliterMax,
  } = useContext(BooksData);

  useEffect(
    (_) => {
      if (null === books) {
        return;
      }
      const minMax = books.reduce(
        (acc, book) => {
          if (book.price < acc.min) {
            acc.min = book.price;
          }
          if (book.price > acc.max) {
            acc.max = book.price;
          }
          return acc;
        },
        { min: books[0].price, max: books[0].price }
      );
      setMin(Math.floor(minMax.min));
      setMax(Math.ceil(minMax.max));
    },
    [books, setMin, setMax]
  );

  useEffect(
    (_) => {
      setFliterMin(min);
      setFliterMax(max);
    },
    [setFliterMin, setFliterMax, min, max]
  );

  return (
    <div className="top">
      <div className="block">
        <h2>Filter</h2>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          {sorts.map((sort) => (
            <option key={sort.id} value={sort.id}>
              {sort.title}
            </option>
          ))}
        </select>
      </div>
      {types && (
        <div className="block">
          <h2>Categories</h2>
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
          >
            <option value="all">All</option>
            {types.map((sort) => (
              <option key={sort.id} value={sort.id}>
                {sort.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {books && (
        <div className="block">
          <h2>Price filter</h2>
          <div className="prices">
            <label>From:</label>
            <div>
              <span>{min}</span>
              <span>{filterMin}</span>
              <span>{max}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={filterMin}
              onChange={(e) => setFliterMin(+e.target.value)}
            />
          </div>
          <div className="prices">
            <label>To:</label>
            <div>
              <span>{min}</span>
              <span>{filterMax}</span>
              <span>{max}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              value={filterMax}
              onChange={(e) => setFliterMax(+e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
