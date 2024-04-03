import { useContext, useEffect, useState } from "react";
import Nav from "../../Components/Nav";
import useGet from "../../Hooks/useGet";
import { Router } from "../../Contexts/Router";
import * as icon from "../../icons";
import { SERVER_URL } from "../../Constants/main";
import usePost from "../../Hooks/usePost";

export default function Index() {
  const [rate, setRate] = useState(0);
  const [afterRate, setAfterRate] = useState(null);

  const { params } = useContext(Router);
  const { data, loading } = useGet("/book/" + params[0] || "0");
  const { data: rating, loading: ratingLoading } = useGet(
    "/rating/" + (params[0] || "") + "/" + localStorage.getItem("userMark")
  );
  const { setSendData, setPostUrl } = usePost();

  //Data
  const heroes = (data) => {
    const h = [];
    data.forEach((item) => {
      h.push({
        id: item.hero_id,
        name: item.hero,
        good: item.good,
        image: item.image,
        url: item.heroUrl,
      });
    });
    return h;
  };

  //Data
  const book =
    data === null
      ? {}
      : {
          id: data[0].id,
          title: data[0].title,
          genre: data[0].genre,
          pages: data[0].pages,
          name: data[0].name,
          surname: data[0].surname,
          heroes: heroes(data),
        };

  //Rating;
  useEffect(
    (_) => {
      if (rate === 0) return;
      setSendData({ rate: rate });
      setPostUrl("/rating/" + book.id + "/" + localStorage.getItem("userMark"));
      setAfterRate({
        rate: +((rating.sum + rate) / (rating.votes + 1)).toFixed(1),
        votes: rating.votes + 1,
      });
      setRate(0);
    },
    [rate, setSendData, setPostUrl, book.id]
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
          <div className="col-4 mt-4 m-auto">
            <h1>Book</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-8 m-auto mt-4">
            <div className="card">
              <div className="card-header">
                <h3>
                  <span>{book.title}</span>
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <p>
                      <strong>Author: </strong>
                      {book.name} {book.surname}
                    </p>
                    <p>
                      <strong>Genre: </strong>
                      {book.genre}
                    </p>
                    <p>
                      <strong>Pages: </strong>
                      {book.pages} p.
                    </p>

                    {/* Ratings */}
                    {!ratingLoading && (
                      <div className="rating-container">
                        <div className="rating">
                          <div className="empty"></div>
                          <div
                            className="full-stars"
                            style={{
                              width:
                                afterRate !== null
                                  ? afterRate.rate * 20 + "%"
                                  : rating.rate === null
                                  ? "0"
                                  : rating.rate * 20 + "%",
                            }}
                          ></div>
                        </div>

                        {rating.rate === null && afterRate === null && (
                          <span>0/5 (0)</span>
                        )}

                        {rating.rate !== null && afterRate === null && (
                          <span className="m-1">
                            {rating.rate}/5 ({rating.votes})
                          </span>
                        )}

                        {afterRate !== null && (
                          <span>
                            {afterRate.rate}/5 ({afterRate.votes})
                          </span>
                        )}

                        {rating.canRate && afterRate === null && (
                          <select
                            className="m-1"
                            value={rate}
                            onChange={(e) => setRate(+e.target.value)}
                          >
                            <option value="0">Rate this book</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        )}
                        {afterRate !== null && (
                          <span>Thank you for rating</span>
                        )}
                      </div>
                    )}

                    {ratingLoading && (
                      <div className="element-loader">
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>

                  <div className="col-2">
                    <h5>Heroes</h5>
                    <ul className="list-style">
                      {book.heroes.map((hero) => (
                        <li className="books-icon-container" key={hero.id}>
                          {hero.image === null && (
                            <img
                              src={SERVER_URL + "/imagesHero/img-not-found.jpg"}
                              alt={hero.name}
                              className="img-thumbnail"
                            />
                          )}
                          {hero.image && (
                            <img
                              src={SERVER_URL + "/" + hero.image}
                              alt={hero.name}
                              className="img-thumbnail"
                            />
                          )}
                          <div className="d-flex nice-link">
                            <a href={"#hero/" + hero.url}>
                              <p>{hero.name}</p>
                            </a>
                            <span
                              className={
                                "books-icon icon " +
                                (hero.good ? "good" : "bad")
                              }
                            >
                              {hero.good ? icon.good : icon.bad}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
