const express = require("express");
const cors = require("cors");
const { v4: uuid4 } = require("uuid");
const bodyParser = require("body-parser");
const fs = require("node:fs");
const app = express();
const port = 3001;

app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());

//Create
app.get("/bills", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  // res.status(400).end();
  res.json(data);
});
app.post("/bills", (req, res) => {
  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  const newBills = req.body;
  newBills.id = uuid4();
  data.push(newBills);
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
  res.json({ id: newBills.id, message: "Bill uploded", type: "success" });
});
//Create
//Delete
app.delete("/bills/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  const id = req.params.id;
  data = data.filter((input) => input.id !== id);
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
  // res.status(204).end();
  res.json({ message: "Bill deleted", type: "info" });
});
//Delete
//Update
app.put("/bills/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));
  const id = req.params.id;
  const updateName = req.body;
  data = data.map((input) => (input.id === id ? { ...updateName, id } : input));
  fs.writeFileSync("./data/data.json", JSON.stringify(data));
  res.json({ message: "Bill updated", type: "info" });
});
//Update
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
