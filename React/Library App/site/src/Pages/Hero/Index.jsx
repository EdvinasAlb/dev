import { useContext } from "react";
import Nav from "../../Components/Nav";
import useGet from "../../Hooks/useGet";
import { Router } from "../../Contexts/Router";
import * as icon from "../../icons";
import { SERVER_URL } from "../../Constants/main";

export default function Index() {
  const { params } = useContext(Router);
  const { data, loading } = useGet("/hero/" + params[0] || "0");
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
            <h1>Hero</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="card">
              <div className="card-header">
                <h3>
                  <span>{data.name}</span>
                  <span className={"icon " + (data.good ? "good" : "bad")}>
                    {data.good ? icon.good : icon.bad}
                  </span>
                </h3>
              </div>
              <div className="card-body">
                <div className="hero-img">
                  {data.image ? (
                    <img
                      className="img-fluid"
                      src={SERVER_URL + "/" + data.image}
                      alt="data.name"
                    />
                  ) : (
                    <img
                      className="img-fluid"
                      src={SERVER_URL + "/imagesHero/img-not-found.jpg"}
                      alt="data.name"
                    />
                  )}
                  <div className="hero-info">
                    <div>Book: {data.title}</div>
                    <div>
                      Author: {data.authorName} {data.authorSurname}
                    </div>
                    <div>
                      <a href={"#book/" + data.url}>view book</a>
                    </div>
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
