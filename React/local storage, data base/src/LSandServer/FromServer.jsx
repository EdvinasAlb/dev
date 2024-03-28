import { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Create from "./Create";
import Read from "./Read";
import axios from "axios";
import Delete from "./Destroy";
import Edit from "./Edit";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Messages";

const URL = "http://localhost:3001/bills";

export default function App() {
  const [bills, setBills] = useState([]);

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [destroyData, setDestroyData] = useState(null);

  const [editData, setEditdata] = useState(null);
  const [updateData, setUpdateData] = useState(null);

  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const clients = bills.length;

  const addMessage = useCallback((type, text) => {
    const id = uuidv4();
    setMessages((prevMessages) => [{ id, type, text }, ...prevMessages]);
    setTimeout((_) => {
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  useEffect((_) => {
    axios
      .get(URL)
      .then((res) => {
        setBills(res.data);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          setError(err.response.status + " " + err.response.statusText);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(
    (_) => {
      if (null !== createData) {
        axios.post(URL, createData).then((res) => {
          setBills((prevBills) => [
            ...prevBills,
            { ...createData, id: res.data.id },
          ]);
          setError(null);
          addMessage(res.data.type, res.data.message);
        });
      }
    },

    [createData, setBills, addMessage]
  );
  //-----------------------------------Create

  useEffect(
    (_) => {
      if (null !== destroyData) {
        axios
          .delete(`${URL}/${destroyData.id}`)
          .then((res) => {
            setBills((prevBills) =>
              prevBills.filter((bills) => bills.id !== destroyData.id)
            );
            setDeleteData(null);
            setError(null);
            addMessage(res.data.type, res.data.message);
          })
          .catch((err) => {
            console.log(err);
            addMessage(
              "danger",
              err.response
                ? err.response.status + " " + err.response.statusText
                : err.message
            );
          });
      }
    },

    [destroyData, setBills, addMessage]
  );
  //------------------------------Destroy

  useEffect(
    (_) => {
      if (null !== updateData) {
        axios.put(`${URL}/${updateData.id}`, updateData).then((res) => {
          setBills((prevBills) =>
            prevBills.map((bill) =>
              bill.id === updateData.id
                ? { ...updateData, id: updateData.id }
                : bill
            )
          );

          console.log(updateData);
          setEditdata(null);
          setError(null);
          addMessage(res.data.type, res.data.message);
        });
      }
    },
    [updateData, setBills, addMessage]
  );

  //-----------------------------Update
  return (
    <>
      <div className="statistic">
        {bills.length > 0 ? <p>Clients: {clients}</p> : <p>No Bills</p>}
      </div>
      <Create setCreateData={setCreateData} />
      <Read
        bills={bills}
        setDeleteData={setDeleteData}
        setEditdata={setEditdata}
      />
      <Delete
        deleteData={deleteData}
        setDeleteData={setDeleteData}
        setDestroyData={setDestroyData}
      />
      <Edit
        editData={editData}
        setEditdata={setEditdata}
        setUpdateData={setUpdateData}
      />
      <div className="bills-loading">
        {bills && !bills.length && <p>No Bills found</p>}

        {bills && error ? <p style={{ color: "crimson" }}>{error}</p> : null}
      </div>
      <Messages messages={messages} />
    </>
  );
}
