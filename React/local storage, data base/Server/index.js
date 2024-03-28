const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "forest2",
});
const app = express();
const port = 3001;
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());

connection.connect();
//Get data
app.get("/trees", (req, res) => {
  console.log(req.query);

  const sort = req.query.sort || "";
  //Sorted data
  let sql;
  if (sort === "height_asc") {
    sql = `
    SELECT *
    FROM trees
    ORDER BY height ASC
    `;
  } else if (sort === "height_desc") {
    sql = `
    SELECT *
    FROM trees
    ORDER BY height DESC
    `;
  } else if (sort === "name_asc") {
    sql = `
    SELECT *
    FROM trees
    ORDER BY name ASC
    `;
  } else if (sort === "name_desc") {
    sql = `
    SELECT *
    FROM trees
    ORDER BY name DESC
    `;
  } else {
    sql = `
    SELECT *
    FROM trees
    `;
  }

  // const sql = `
  //   SELECT id, name, height, type
  //   FROM trees
  //   -- WHERE TYPE = 'lapuotis' AND HEIGHT > '9'
  //   -- ORDER BY type ASC, height DESC
  //   -- LIMIT 3, 3
  // `;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});
//Insert data
app.post("/trees", (req, res) => {
  //Preparation statment
  const sql = `
  INSERT INTO trees (name, height, type)
  VALUES (?, ?, ?)
  `;
  const { name, height, type } = req.body;
  connection.query(sql, [name, height, type], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId });
  });
});
//Delete data
app.delete("/trees/:id", (req, res) => {
  //Preparation statment
  const sql = `
  DELETE FROM trees
  WHERE id = ?
  `;
  connection.query(sql, [req.params.id], (err) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});

//Update data
app.put("/trees/:id", (req, res) => {
  const sql = `
  UPDATE trees
  SET height = ?
  WHERE id = ?
  `;
  const { height } = req.body;
  connection.query(sql, [height, req.params.id], (err) => {
    if (err) throw err;
    res.json({ status: "ok" });
  });
});
//Stats
app.get("/trees/stats", (req, res) => {
  const sql = `
  SELECT COUNT(*) AS total, AVG(height) AS average
  FROM trees
  `;
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows[0]);
  });
});
//Clients + numbers
app.get("/clients", (req, res) => {
  const type = req.query.type || "";
  let sql;
  if (type === "inner") {
    sql = `
  SELECT c.id, p.id AS pid, name, number, client_id 
  FROM clients AS c
  INNER JOIN phones AS p
  ON c.id = p.client_id
  ORDER BY c.id
  `;
  } else if (type === "left") {
    sql = `
  SELECT c.id, p.id AS pid, name, number, client_id 
  FROM clients AS c
  LEFT JOIN phones AS p
  ON c.id = p.client_id
  `;
  } else if (type === "right") {
    sql = `
  SELECT c.id, p.id AS pid, name, number, client_id 
  FROM clients AS c
  RIGHT JOIN phones AS p
  ON c.id = p.client_id
  `;
  } else {
  }

  connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Maria listen ${port}`);
});
