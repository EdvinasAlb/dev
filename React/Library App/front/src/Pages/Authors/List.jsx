import { useContext } from "react";
import { Authors } from "../../Contexts/Authors";

export default function List() {
  const { authors, setDeleteAuthor, setEditAuthor } = useContext(Authors);
  return (
    <>
      {authors.map((author) => (
        <div key={author.id}>
          {author.deleted ? (
            <div className="alert alert-danger" role="alert">
              {author.name} {author.surname} was deleted
            </div>
          ) : (
            <div
              key={author.id}
              className="card mt-2"
              style={{ opacity: author.temp ? 0.5 : 1 }}
            >
              <div className="card-header">
                <h4>
                  {author.name} {author.surname}
                </h4>
              </div>
              <div className="card-body">
                <p>Nickname: {author.nickname}</p>
                <p>
                  {new Intl.DateTimeFormat("lt-LT").format(
                    new Date(author.born)
                  )}
                </p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  disabled={author.temp ? true : false}
                  onClick={(_) => setDeleteAuthor(author)} //Author 2 delete
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  disabled={author.temp ? true : false}
                  onClick={(_) => setEditAuthor(author)}
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
