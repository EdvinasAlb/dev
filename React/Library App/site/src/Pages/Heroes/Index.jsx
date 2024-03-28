import { useEffect, useState } from "react";
import Nav from "../../Components/Nav";
import { SERVER_URL } from "../../Constants/main";
import useGet from "../../Hooks/useGet";
import * as icon from "../../icons";

const filterBy = [
  { filter: "good", label: "Good" },
  { filter: "bad", label: "Bad" },
];

const sortBy = [
  { sort: "name_asc", label: "Name (A-Z)" },
  { sort: "name_desc", label: "Name (Z-A)" },
];

export default function Index() {
  const { data, loading, setUrl } = useGet("/heroes-list");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  //Sort, filter
  useEffect(
    (_) => {
      if (sort && !filter) {
        setUrl(`/heroes-list?sort=${sort}`);
      } else if (sort && filter) {
        setUrl(`/heroes-list?filter=${filter}&sort=${sort}`);
      } else if (!sort && filter) {
        setUrl(`/heroes-list?filter=${filter}`);
      } else {
        setUrl("/heroes-list");
      }
    },
    [sort, filter, setUrl]
  );

  //Pagination
  const go = (e, page) => {
    e.preventDefault();
    if (page === "prev") {
      page = data.page - 1;
      page = Math.max(1, page);
    }
    if (page === "next") {
      page = data.page + 1;
      page = Math.min(data.totalPages, page);
    }
    //Sort + filter + pagination
    if (filter && !sort) {
      setUrl("/heroes-list?filter=" + filter + "&page=" + page);
    } else if (filter && sort) {
      setUrl(
        "/heroes-list?filter=" + filter + "&sort=" + sort + "&page=" + page
      );
    } else if (!filter && sort) {
      setUrl("/heroes-list?sort=" + sort + "&page=" + page);
    } else {
      setUrl("/heroes-list?page=" + page);
    }
  };

  //Pages 1, 2, 3, 4...
  // const pages = Array.from({ length: data.totalPages }, (v, k) => k + 1);
  //Pages 1, 2 ... 3, 4
  const getPages = (_) => {
    const showPaginators = 3;
    const activePage = data.page;
    const pages = [];
    let start = activePage - showPaginators;
    let end = activePage + showPaginators;
    for (let i = start; i <= end; i++) {
      if (i >= 1 && i <= data.totalPages) {
        pages.push(i);
      }
    }
    return pages;
  };

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
            <h1>Heroes</h1>
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
                      <h3>List</h3>
                    </div>
                    <div className="col-2 mt-4">
                      <div className="mb-3">
                        <label htmlFor="filter" className="form-label">
                          Filter heroes
                        </label>
                        <select
                          className="form-select"
                          id="filter"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                        >
                          <option value="">All</option>
                          {filterBy.map((item) => (
                            <option key={item.filter} value={item.filter}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-2 mt-4">
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
                          <option value="">Default</option>
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
                <table className="table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Good/Bad</th>
                      <th>Book</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.result.map((hero) => {
                      return (
                        <tr key={hero.id}>
                          <td>{hero.id}</td>
                          <td>{hero.name}</td>
                          <td>
                            <span
                              className={"icon " + (hero.good ? "good" : "bad")}
                            >
                              {hero.good ? icon.good : icon.bad}
                            </span>
                          </td>
                          <td className="hero-info">
                            <a href={"#book/" + hero.url}>{hero.title}</a>
                          </td>
                          <td>
                            {hero.image === null && <span>No image.</span>}
                            {hero.image && (
                              <img
                                src={SERVER_URL + "/" + hero.image}
                                alt={hero.name}
                                className="img-thumbnail"
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <nav className="m-4 d-flex">
                <ul className="pagination">
                  {data.page === 1 || (
                    <li className="page-item">
                      <a
                        className="page-link next"
                        onClick={(e) => go(e, 1)}
                        href="/"
                      >
                        {icon.last}
                      </a>
                    </li>
                  )}
                  {data.page === 1 || (
                    <li className="page-item">
                      <a
                        className="page-link next"
                        onClick={(e) => go(e, "prev")}
                        href="/"
                      >
                        {icon.next}
                      </a>
                    </li>
                  )}
                  {getPages().map((page) => {
                    return (
                      <li
                        key={page}
                        className={
                          "page-item" + (data.page === page ? " active" : "")
                        }
                      >
                        {data.page === page && (
                          <span className="page-link">{page}</span>
                        )}
                        {data.page === page || (
                          <a
                            className="page-link"
                            onClick={(e) => go(e, page)}
                            href="/"
                          >
                            {page}
                          </a>
                        )}
                      </li>
                    );
                  })}
                  {data.page === data.totalPages || (
                    <li className="page-item prev">
                      <a
                        className="page-link"
                        onClick={(e) => go(e, "next")}
                        href="/"
                      >
                        {icon.next}
                      </a>
                    </li>
                  )}
                  {data.page === data.totalPages || (
                    <li className="page-item prev">
                      <a
                        className="page-link"
                        onClick={(e) => go(e, data.totalPages)}
                        href="/"
                      >
                        {icon.last}
                      </a>
                    </li>
                  )}
                </ul>
                <div className="total-pages">
                  Page {data.page} of {data.totalPages}
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
