import { useContext } from "react";
import { Books } from "../../Contexts/Books";

export default function Delete() {
  const { deleteBook, setDeleteBook, setDestroyBook } = useContext(Books);

  const submit = (_) => {
    setDestroyBook(deleteBook);
    setDeleteBook(null);
  };

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
              onClick={(_) => setDeleteBook(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure to delete {deleteBook.title}?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={submit}>
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(_) => setDeleteBook(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
