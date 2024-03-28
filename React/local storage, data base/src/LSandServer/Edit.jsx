import { useEffect, useState } from "react";

export default function Edit({ editData, setEditdata, setUpdateData }) {
  const [billName, setBillName] = useState("");
  const [billSurname, setBillSurname] = useState("");

  const [totalMoney, setTotalMoney] = useState(0);
  const [summ, setSumm] = useState("");

  const sum = (_) => {
    if (+summ === undefined) {
      return;
    }
    setTotalMoney(+summ + totalMoney);
  };

  const minus = (_) => {
    if (+summ === undefined) {
      return;
    }
    setTotalMoney(totalMoney - summ);
  };

  useEffect(
    (_) => {
      if (null === editData) {
        return;
      }
      setBillName(editData.billName);
      setBillSurname(editData.billSurname);
      setTotalMoney(editData.totalMoney);
    },
    [editData, setTotalMoney]
  );
  if (null === editData) {
    return null;
  }

  const save = (_) => {
    setUpdateData({ ...editData, totalMoney, billName, billSurname });
    setEditdata(null);
    if (null === editData) {
      return null;
    }
    setSumm("");
  };

  return (
    <div className="modal">
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button
              className="btn edit-btn__close"
              onClick={(_) => setEditdata(null)}
            >
              ✖
            </button>
            <h3 className="edit-text__client">
              {billName} {billSurname}
            </h3>
            <h4>{totalMoney}</h4>
            <input
              className="edit-form-input"
              type="number"
              value={summ}
              onChange={(e) => setSumm(e.target.value)}
            />
            <div className="edit-btn__container">
              <button className="btn" onClick={sum}>
                ➕
              </button>
              <button className="btn" onClick={minus}>
                ➖
              </button>
            </div>
            <button className="btn edit-btn__save" onClick={save}>
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
