import { useContext } from "react";
import { Heroes } from "../../Contexts/Heroes";
import { SERVER_URL } from "../../Constants/main";

export default function List() {
  const { heroes, setDeleteHero, setEditHero } = useContext(Heroes);
  return (
    <>
      {heroes.map((hero) => (
        <div key={hero.id}>
          {hero.deleted ? (
            <div className="alert alert-danger" role="alert">
              {hero.name} was deleted
            </div>
          ) : (
            <div
              key={hero.id}
              className="card mt-2"
              style={{ opacity: hero.temp ? 0.5 : 1 }}
            >
              <div className="card-header">
                <h4>{hero.name}</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-5">
                    <p>Hero character: {hero.good ? "good" : "bad"}</p>
                    <p>
                      Author: {hero?.author?.name} {hero?.author?.surname}
                    </p>
                    <p>Book: {hero?.book?.title}</p>
                  </div>
                  <div className="col-7">
                    {hero?.image && (
                      <img
                        src={hero?.image}
                        alt={hero?.name}
                        className="img-fluid"
                      />
                    )}
                    {!hero?.image && (
                      <img
                        src={SERVER_URL + "/imagesHero/img-not-found.jpg"}
                        alt="not found"
                        className="img-fluid"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  disabled={hero.temp ? true : false}
                  onClick={(_) => setDeleteHero(hero)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  disabled={hero.temp ? true : false}
                  onClick={(_) => setEditHero(hero)}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
