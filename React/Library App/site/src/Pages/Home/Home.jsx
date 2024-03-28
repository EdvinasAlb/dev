import { useEffect, useState } from "react";
import Nav from "../../Components/Nav";
import useGet from "../../Hooks/useGet";

const sortBy = [
  { sort: "name_asc", label: "Name (A-Z)" },
  { sort: "name_desc", label: "Name (Z-A)" },
];

export default function Index() {
  const [sort, setSort] = useState("");

  const { data, loading, setUrl } = useGet("/");

  // const authorsBooks = (data) => {
  //   const authors = [];
  //   data.forEach((item) => {
  //     //Some - search, not give, just tell item is
  //     if (!authors.some((author) => author.id === item.id)) {
  //       authors.push({
  //         id: item.id,
  //         name: item.name,
  //         surname: item.surname,
  //         books: [],
  //       });
  //     }
  //     authors
  //       .find((author) => author.id === item.id)
  //       .books.push({ id: item.book_id, title: item.title });
  //   });
  //   return authors;
  // };

  const authorsBooksHeroes = (data) => {
    if (!data) return [];
    const authors = [];
    data.forEach((item) => {
      //Some - search, not give, just tell item is
      if (!authors.some((author) => author.id === item.id)) {
        authors.push({
          id: item.id,
          name: item.name,
          surname: item.surname,
          books: [],
        });
      }
      if (
        !authors
          .find((author) => author.id === item.id)
          .books.some((book) => book.id === item.book_id)
      ) {
        authors
          .find((author) => author.id === item.id)
          .books.push({ id: item.book_id, title: item.title, heroes: [] });
      }

      authors
        .find((author) => author.id === item.id)
        .books.find((book) => book.id === item.book_id)
        .heroes.push({ id: item.hero_id, name: item.hero, good: item.good });
    });
    return authors;
  };

  useEffect(
    (_) => {
      if (sort) {
        setUrl(`/?sort=${sort}`);
      } else {
        setUrl("/");
      }
    },
    [sort, setUrl]
  );

  if (loading)
    return (
      <div className="container-loader">
        <div className="loader"></div>
      </div>
    );

  return (
    <>
      <Nav />
      <div className="container text-center">
        <div className="row">
          <div className="col-4 mt-4">
            <h1>Home</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="card">
              <div className="card-header">
                <div className="container">
                  <div className="row">
                    <div className="col-8 mt-4">
                      <h3>All Library</h3>
                    </div>
                    <div className="col-4 mt-4">
                      <div className="mb-3">
                        <label htmlFor="sort" className="form-label">
                          Sort by name
                        </label>
                        <select
                          className="form-select"
                          id="sort"
                          value={sort}
                          onChange={(e) => setSort(e.target.value)}
                        >
                          <option value="">default</option>
                          {sortBy.map((item) => (
                            <option key={item.sort} value={item.sort}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="container">
                  <div className="row mb-3">
                    <div className="col-2">
                      <h4>Authors</h4>
                    </div>
                    <div className="col-4">
                      <h4>Books</h4>
                    </div>
                    <div className="col-4">
                      <h4>Heroes</h4>
                    </div>
                  </div>
                  {authorsBooksHeroes(data).map((item) => (
                    <div className="row" key={item.id}>
                      <div className="col-2">
                        {item.name} {item.surname}
                      </div>
                      <div className="col-4">
                        <ul>
                          {item.books.map((book) => (
                            <li
                              style={{
                                marginBottom: book.heroes.length * 24 + "px",
                              }}
                              key={book.id}
                            >
                              {book.title}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-3">
                        <ul className="list-style">
                          {item.books.map((book) => (
                            <li key={book.id}>
                              {book.heroes[0].id !== null ? (
                                <ol className="mb-20">
                                  {book.heroes.map((hero) => (
                                    <li
                                      style={{
                                        color: hero.good
                                          ? "skyblue"
                                          : "crimson",
                                      }}
                                      key={hero.id}
                                    >
                                      <a
                                        style={{
                                          color: hero.good
                                            ? "skyblue"
                                            : "crimson",
                                          textDecoration: "none",
                                        }}
                                        href={"#hero/" + hero.id}
                                      >
                                        {hero.name}
                                      </a>
                                    </li>
                                  ))}
                                </ol>
                              ) : (
                                <div className="mb-20 no-heroes">No heroes</div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
