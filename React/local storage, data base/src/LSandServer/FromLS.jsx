import { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Create from "./Create";
import Read from "./Read";
import { lsRead, lsStore, lsDestroy, lsUpdate } from "./lsManager";
import Delete from "./Destroy";
import Edit from "./Edit";
import { v4 as uuidv4 } from "uuid";
import Messages from "./Messages";

export default function App() {
  const KEY = "bills";
  const [bills, setBills] = useState([]);

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [destroyData, setDestroyData] = useState(null);

  const [editData, setEditdata] = useState(null);
  const [updateData, setUpdateData] = useState(null);

  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((type, text) => {
    const id = uuidv4();
    setMessages((prevMessages) => [{ id, type, text }, ...prevMessages]);
    setTimeout((_) => {
      setMessages((prevMessages) => prevMessages.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  useEffect((_) => {
    setBills(lsRead(KEY));
  }, []);
  useEffect(
    (_) => {
      if (null === createData) {
        return;
      }
      const id = lsStore(KEY, createData);
      setBills((prevBills) => [...prevBills, { ...createData, id }]);
      addMessage("dark", "You Create succesfully");
    },

    [createData, setBills, addMessage]
  );
  //-----------------------------------Create

  useEffect(
    (_) => {
      if (null === destroyData) {
        return;
      }

      lsDestroy(KEY, destroyData.id);

      setBills((prevBills) =>
        prevBills.filter((bills) => bills.id !== destroyData.id)
      );
      setDeleteData(null);
      addMessage("danger", "You Delete Succesfully");
    },

    [destroyData, setBills, addMessage]
  );
  //------------------------------Destroy

  useEffect(
    (_) => {
      if (null === updateData) {
        return;
      }

      lsUpdate(KEY, updateData.id, updateData);

      setBills((prevBills) =>
        prevBills.map((bill) =>
          bill.id === updateData.id
            ? { ...updateData, id: updateData.id }
            : bill
        )
      );

      setEditdata(null);
      addMessage("light", "You Update Succesfully");
    },
    [updateData, setBills, addMessage]
  );

  //-----------------------------Update
  return (
    <>
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
      <Messages messages={messages} />
    </>
  );
}
