import { BooksDataProvider } from "./ComponentsBooksStore/BooksData";
import BooksList from "./ComponentsBooksStore/BooksList";
import "./BookStore.scss";
import Top from "./ComponentsBooksStore/Top";

export default function App() {
  return (
    <BooksDataProvider>
      <section>
        <div className="container">
          <Top />
        </div>
      </section>
      <section>
        <div className="container">
          <BooksList />
        </div>
      </section>
    </BooksDataProvider>
  );
}
