import { useContext } from "react";
import { Heroes } from "../../Contexts/Heroes";

export default function Delete() {
  const { deleteHero, setDeleteHero, setDestroyHero } = useContext(Heroes);

  const submit = (_) => {
    setDestroyHero(deleteHero);
    setDeleteHero(null);
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
              onClick={(_) => setDeleteHero(null)}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure to delete {deleteHero.name}?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={submit}>
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={(_) => setDeleteHero(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
