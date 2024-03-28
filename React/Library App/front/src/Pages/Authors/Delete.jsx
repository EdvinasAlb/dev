import { useContext } from "react";
import { Authors } from "../../Contexts/Authors";

export default function Delete() {
  const { deleteAuthor, setDeleteAuthor, setDestroyAuthor } =
    useContext(Authors);

  const submit = (_) => {
    setDestroyAuthor(deleteAuthor);
    setDeleteAuthor(null);
  };

  if (!deleteAuthor) return null;

  return (
    <div className="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm delete</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={(_) => setDeleteAuthor(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you sure to delete {deleteAuthor.name} {deleteAuthor.surname}?
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={submit}>
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(_) => setDeleteAuthor(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
