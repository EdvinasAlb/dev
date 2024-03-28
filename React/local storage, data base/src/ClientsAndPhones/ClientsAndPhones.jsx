import React, { useEffect, useState } from "react";
import "./App.css";

import axios from "axios";

const API_URL = "http://localhost:3001/clients";

export default function App() {
  const [clients, setClients] = useState([]);
  const [structured, setStructured] = useState([]);
  const [type, setType] = useState("");

  //Restructuring data
  const restructure = (clients) => {
    const structured = [];
    clients.forEach((client) => {
      const index = structured.findIndex((c) => c.id === client.id);
      if (index === -1) {
        structured.push({
          id: client.id,
          name: client.name,
          phones: [
            {
              pid: client.pid,
              number: client.number,
              client_id: client.client_id,
            },
          ],
        });
      } else {
        structured[index].phones.push({
          pid: client.pid,
          number: client.number,
          client_id: client.client_id,
        });
      }
    });
    return structured;
  };

  useEffect(
    (_) => {
      if (type === "") {
        setClients([]);
        setStructured([]);
        return;
      }
      axios.get(API_URL + "/?type=" + type).then((res) => {
        setClients(res.data);
        setStructured(restructure(res.data));
      });
    },
    [type, setClients]
  );

  return (
    <div className="inside">
      <h1>Clients</h1>
      <h2>Join type {type}</h2>
      <div className="forms">
        <button onClick={(_) => setType("left")}>LEFT</button>
        <button onClick={(_) => setType("inner")}>INNER</button>
        <button onClick={(_) => setType("right")}>RIGHT</button>
        <button onClick={(_) => setType("")}>CLEAR</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Phone ID</th>
            <th>Number</th>
            <th>Phone client_id</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id + "_" + client.pid}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.pid}</td>
              <td>{client.number}</td>
              <td>{client.client_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Structured Data</h2>
      <div className="structured">
        {structured.map((client) => (
          <div key={client.id} className="client">
            <h3>{client.name}</h3>
            <div className="phones">
              {client.phones.map((phone) => (
                <div key={phone.pid} className="phone">
                  <p>{phone.number}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
