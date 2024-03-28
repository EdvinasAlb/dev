import React, { useEffect, useState } from "react";
import "./App.css";
import "./form.css";
import axios from "axios";

const API_URL = "http://localhost:3001/trees";

export default function App() {
  //   const trees = [
  //     { id: 1, name: "Oak", height: 20, type: "Deciduous" },
  //     { id: 2, name: "Pine", height: 15, type: "Evergreen" },
  //     { id: 3, name: "Maple", height: 18, type: "Deciduous" },
  //   ];

  const sorts = [
    { name: "default", value: "Default" },
    { name: "height_asc", value: "Height 1-9" },
    { name: "height_desc", value: "Height 9-1" },
    { name: "name_asc", value: "Name A-Z" },
    { name: "name_desc", value: "Name Z-A" },
  ];

  const types = ["lapuotis", "spygliuotis", "palmė"];
  const [inputs, setInputs] = useState({ name: "", height: "", type: "" });
  const [cutId, setCutId] = useState("");
  const [growInputs, setGrowInputs] = useState({ id: "", height: "" });
  const [sort, setSort] = useState("default");
  const [trees, setTrees] = useState([]);
  const [stats, setStats] = useState({ total: 0, average: 0 });

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  const handleGrowChange = (e) => {
    setGrowInputs({ ...growInputs, [e.target.id]: e.target.value });
  };

  useEffect(
    (_) => {
      axios.get(API_URL + "/stats").then((res) => {
        console.log(res.data);
        setStats(res.data);
      });
    },
    [trees]
  );

  //Get data
  useEffect(
    (_) => {
      axios.get(`${API_URL}/?sort=${sort}`).then((res) => {
        setTrees(res.data);
      });
    },
    [sort]
  );

  //Insert data
  const plant = (_) => {
    axios.post(API_URL, { ...inputs, height: +inputs.height }).then((res) => {
      setTrees([...trees, { ...inputs, id: res.data.id }]);
      setInputs({ name: "", height: "", type: "" });
    });
  };
  //Delete data
  const cut = (_) => {
    axios.delete(`${API_URL}/${cutId}`).then((_) => {
      setTrees(trees.filter((tree) => tree.id !== +cutId));
      setCutId("");
    });
  };
  //Update data
  const grow = (_) => {
    axios
      .put(`${API_URL}/${growInputs.id}`, { height: +growInputs.height })
      .then((_) => {
        setTrees(
          trees.map((tree) =>
            tree.id === +growInputs.id
              ? { ...tree, height: +growInputs.height }
              : tree
          )
        );
        setGrowInputs({ id: "", height: "" });
      });
  };

  return (
    <div className="inside">
      <h1>Trees</h1>
      <h2>Trees in garden: {stats.total}</h2>
      <h2>Trees average height: {stats.average.toFixed(2)} m</h2>
      <div className="sort-box">
        {sorts.map((s) => (
          <label
            key={s.name}
            style={{
              color: sort === s.name ? "black" : "lightgrey",
              background: sort === s.name ? "lightgrey" : "white",
              cursor: sort === s.name ? "default" : "pointer",
            }}
            onClick={(_) => setSort(s.name)}
          >
            {s.value}
          </label>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {trees.map((tree) => (
            <tr key={tree.id}>
              <td>{tree.id}</td>
              <td>{tree.name}</td>
              <td>{tree.height}</td>
              <td>{tree.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="forms">
        <div className="form">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            <h2>Plant a Tree</h2>
            <label htmlFor="name" style={{ margin: "0" }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              style={{ margin: "20px", color: "black" }}
              placeholder="Name"
              value={inputs.name}
              onChange={handleInputs}
            />
            <label htmlFor="height" style={{ margin: "0" }}>
              Height
            </label>
            <input
              type="text"
              id="height"
              style={{ margin: "20px", color: "black" }}
              placeholder="Height"
              value={inputs.height}
              onChange={handleInputs}
            />
            <label htmlFor="type" style={{ margin: "0" }}>
              Type
            </label>
            <select id="type" value={inputs.type} onChange={handleInputs}>
              <option key="0" value="">
                Choose
              </option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <button type="button" style={{ margin: "20px" }} onClick={plant}>
              Plant tree
            </button>
          </form>
        </div>
        <div className="form">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            <h2>Cut a Tree</h2>
            <label htmlFor="id" style={{ margin: "0" }}>
              ID
            </label>
            <input
              type="text"
              id="id"
              style={{ margin: "20px", color: "black" }}
              placeholder="ID"
              value={cutId}
              onChange={(e) => setCutId(e.target.value)}
            />

            <button type="button" style={{ margin: "20px" }} onClick={cut}>
              Cut tree
            </button>
          </form>
        </div>
        <div className="form">
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "sans-serif",
              fontWeight: "bold",
            }}
          >
            <h2>Grow a Tree</h2>
            <label htmlFor="ID" style={{ margin: "0" }}>
              ID
            </label>
            <input
              type="text"
              id="ID"
              style={{ margin: "20px", color: "black" }}
              placeholder="ID"
              value={growInputs.id}
              onChange={handleGrowChange}
            />
            <label htmlFor="Height" style={{ margin: "0" }}>
              Height
            </label>
            <input
              type="text"
              id="Height"
              style={{ margin: "20px", color: "black" }}
              placeholder="Height"
              value={growInputs.height}
              onChange={handleGrowChange}
            />

            <button type="button" style={{ margin: "20px" }} onClick={grow}>
              Grow tree
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
