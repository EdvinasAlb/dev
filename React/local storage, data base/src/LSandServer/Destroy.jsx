export default function Delete({ deleteData, setDeleteData, setDestroyData }) {
  if (null === deleteData) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <span>Are you sure?</span>
            <button className="btn" onClick={(_) => setDeleteData(null)}>
              Cancel
            </button>
            <button className="btn" onClick={(_) => setDestroyData(deleteData)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
