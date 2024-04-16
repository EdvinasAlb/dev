import { useContext } from "react";
import { BooksData } from "./BooksData";
import Book from "./Book";

export default function BooksList() {
  const { books } = useContext(BooksData);
  return (
    <div className="books">
      {books !== null &&
        books.length !== 0 &&
        books.map((book) =>
          book.show.size === 0 ? <Book key={book.id} book={book} /> : null
        )}

      {books !== null && books.length === 0 && (
        <div className="books__empty">No books found</div>
      )}

      {books !== null &&
        0 ===
          books.reduce(
            (acc, book) => acc + (book.show.size === 0 ? 1 : 0),
            0
          ) && <div className="books__empty">Filtered books not found</div>}
      {books === null && <div className="books__empty">Loading books...</div>}
    </div>
  );
}
