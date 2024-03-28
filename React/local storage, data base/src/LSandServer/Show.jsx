export function Show({ bill, setDeleteData, setEditdata }) {
  return (
    <div className="show-list">
      <button
        className="btn show-btn__delete"
        onClick={(_) => setDeleteData(bill)}
      >
        ✖
      </button>
      <h3 className="show-text__client">
        {bill.billName} {bill.billSurname}
      </h3>
      <h4 className="show-text__money">{bill.totalMoney} Eu.</h4>

      <button className="btn" onClick={(_) => setEditdata(bill)}>
        Edit
      </button>
    </div>
  );
}
