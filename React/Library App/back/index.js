const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
const fs = require("fs");
const md5 = require("md5");
const { v4: uuidv4 } = require("uuid");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});

const app = express();
const port = 80;

//Config.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
//express.static - folder for load files
app.use(express.static("public"));
app.use(bodyParser.json());
connection.connect();

//FILES//
//Create image
const writeImage = (imageBase64, res) => {
  if (!imageBase64) {
    return null;
  }
  let type;
  let image;
  if (imageBase64.indexOf("data:image/png;base64") === 0) {
    type = "png";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/png;base64,/, ""),
      "base64"
    );
  } else if (imageBase64.indexOf("data:image/jpeg;base64,") === 0) {
    type = "jpg";
    image = Buffer.from(
      imageBase64.replace(/^data:image\/jpeg;base64,/, ""),
      "base64"
    );
  } else {
    res.status(500).send("Bad image format");
    return;
  }
  const filename = md5(uuidv4()) + "." + type;
  fs.writeFileSync("public/imagesHero/" + filename, image);
  return filename;
};

//Delete image
const deleteImage = (heroId, res) => {
  let sql = "SELECT image FROM heroes WHERE id = ?";
  connection.query(sql, [heroId], (err, results) => {
    if (err) {
      res.status.send(err);
    } else {
      if (results[0].image) {
        fs.unlinkSync("public/" + results[0].image);
      }
    }
  });
};

//Middleware
const doAuth = (req, res, next) => {
  const token = req.cookies.libSession || "";

  if (token === "") {
    return next();
  }

  const sql = `
  SELECT name, id, role
  FROM users
  WHERE session = ?
  `;
  connection.query(sql, [token], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Server error On Auth" });
    } else {
      if (results.length > 0) {
        const user = results[0];
        req.user = user;
      }
    }
    return next();
  });
};
app.use(doAuth);

// Front office //
//Authors, books, heroes
app.get("/", (req, res) => {
  const sort = req.query.sort || "";
  let sql;
  if (sort === "name_asc") {
    sql = `SELECT a.id, a.name, a.surname, b.id as book_id, b.title, b.pages, b.genre, h.id as hero_id, h.name as hero, good
    FROM authors as a
    LEFT JOIN books as b
    ON a.id = b.author_id
    LEFT JOIN heroes as h
    ON b.id = h.book_id
    ORDER BY a.surname, a.name`;
  } else if (sort === "name_desc") {
    sql = `SELECT a.id, a.name, a.surname, b.id as book_id, b.title, b.pages, b.genre, h.id as hero_id, h.name as hero, good
    FROM authors as a
    LEFT JOIN books as b
    ON a.id = b.author_id
    LEFT JOIN heroes as h
    ON b.id = h.book_id
    ORDER BY a.surname DESC, a.name DESC`;
  } else {
    sql = `SELECT a.id, a.name, a.surname, b.id as book_id, b.title, b.pages, b.genre, h.id as hero_id, h.name as hero, good
    FROM authors as a
    LEFT JOIN books as b
    ON a.id = b.author_id
    LEFT JOIN heroes as h
    ON b.id = h.book_id`;
  }
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

//Heroes
app.get("/hero/:id", (req, res) => {
  const sql = `
  SELECT h.id, h.name, a.name as authorName, a.surname as authorSurname, good, title, book_id, image
  FROM heroes as h
  LEFT JOIN books as b
  ON h.book_id = b.id
  LEFT JOIN authors as a
  ON b.author_id = a.id
  WHERE h.id = ?
  `;
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]);
    }
  });
});

//Books
app.get("/book/:slug", (req, res) => {
  const sql = `
  Select b.id, title, pages, genre, a.name, surname, author_id, url, h.id as hero_id, h.name as hero, good, image

  FROM books AS b
  LEFT JOIN authors AS a
  ON b.author_id = a.id
  LEFT JOIN heroes AS h
  ON b.id = h.book_id
  WHERE b.url = ?
  `;
  connection.query(sql, [req.params.slug], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

//Heroes-list (pagination + filter)
app.get("/heroes-list", (req, res) => {
  let sql;
  let query;
  const inPage = 5;
  const page = req.query.page || 1;
  let filter = req.query.filter || "";
  let sort = req.query.sort || "";
  filter = filter === "good" ? 1 : filter === "bad" ? 0 : "";
  let total = 0;
  let totalPages = 0;
  if (filter === "") {
    //Count
    sql = `
  SELECT COUNT(*) AS total 
  FROM heroes
  `;
    query = [];
  } else {
    sql = `
    SELECT COUNT(*) AS total
    FROM heroes
    WHERE good = ?
    `;
    query = [filter];
  }
  connection.query(sql, query, (err, countResult) => {
    if (err) {
      res.status(500).send(err);
    } else {
      total = countResult[0].total;
      totalPages = Math.ceil(total / inPage);
    }
  });
  if (filter === "" && sort === "") {
    //Select
    sql = `
  SELECT h.id, h.name, h.good, h.book_id, h.image, b.url, b.title
  FROM heroes AS h
  LEFT JOIN books AS b
  ON h.book_id = b.id
  LIMIT ?, ?
  `;
    query = [(page - 1) * inPage, inPage];
  } else if (filter !== "" && sort === "") {
    sql = `
    SELECT *
    FROM heroes
    WHERE good = ?
    LIMIT ?, ?
    `;
    query = [filter, (page - 1) * inPage, inPage];
  } else if (filter === "" && sort !== "") {
    if (sort === "name_asc") {
      sql = `
    SELECT *
    FROM heroes
    ORDER BY name
    LIMIT ?, ?
    `;
    } else if (sort === "name_desc") {
      sql = `
      SELECT *
      FROM heroes
      ORDER BY name DESC
      LIMIT ?, ?
      `;
    } else {
      sql = `
      SELECT *
      FROM heroes
      LIMIT ?, ?
      `;
    }
    query = [(page - 1) * inPage, inPage];
  } else {
    if (sort === "name_asc") {
      sql = `
      SELECT *
      FROM heroes
      WHERE good = ?
      ORDER BY name
      LIMIT ?, ?
      `;
    } else if (sort === "name_desc") {
      sql = `
      SELECT *
      FROM heroes
      WHERE good = ?
      ORDER BY name DESC
      LIMIT ?, ?
      `;
    } else {
      sql = `
      SELECT *
      FROM heroes
      WHERE good = ?
      LIMIT ?, ?
      `;
    }
    query = [filter, (page - 1) * inPage, inPage];
  }
  connection.query(sql, query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ result, total, totalPages, page: +page });
    }
  });
});

//Ratings
app.get("/rating/:slug/:mark", (req, res) => {
  setTimeout((_) => {
    const sql = `
  SELECT ratings
  FROM books
  WHERE url = ?
  `;
    connection.query(sql, [req.params.slug], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const ratings = JSON.parse(result[0].ratings);
        const userMark = ratings.find((item) => item.mark === req.params.mark);
        const votes = ratings.length;
        const sum = ratings.reduce((acc, item) => acc + +item.rate, 0);
        const rate = +(sum / votes).toFixed(1);
        res.json({
          canRate: userMark === undefined ? true : false,
          rate,
          votes,
          sum,
        });
      }
    });
  }, 2000);
});

//Ratings
app.post("/rating/:id/:mark", (req, res) => {
  const { rate } = req.body;
  const mark = req.params.mark;
  const sql = `
  SELECT ratings
  FROM books
  WHERE id = ?
  `;
  connection.query(sql, [req.params.id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const ratings = JSON.parse(result[0].ratings);
      ratings.push({ mark, rate });
      const newRatings = JSON.stringify(ratings);
      const sql = `
      UPDATE books
      SET ratings = ?
      WHERE id = ?
      `;
      connection.query(sql, [newRatings, req.params.id], (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({ success: true });
        }
      });
    }
  });
});

//Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE name = ? AND password = ?";
  connection.query(sql, [username, md5(password)], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Server error on login" });
    } else {
      if (results.length > 0) {
        const token = md5(uuidv4());
        const sql = "UPDATE users SET session  = ? WHERE id = ?";
        connection.query(sql, [token, results[0].id], (err) => {
          if (err) {
            res.status(500).json({ message: "Server error on login" });
          } else {
            res.cookie("libSession", token, {
              maxAge: 1000 * 60 * 60 * 24 * 365,
              httpOnly: true,
            });
            res.json({
              success: true,
              name: results[0].name,
              role: results[0].role,
              id: results[0].id,
            });
          }
        });
      } else {
        res.status(401).json({ message: "Invalid name or password" });
      }
    }
  });
});

//Logout
app.post("/logout", (req, res) => {
  const token = req.cookies.libSession || "";
  const sql = "UPDATE users SET session = NULL WHERE session = ?";
  connection.query(sql, [token], (err) => {
    if (err) {
      res
        .status(500)
        .json({ message: { type: "danger", text: "Server Error" } });
    } else {
      res.clearCookie("libSession");
      res.json({ message: { type: "success", text: "Goodbye" } });
    }
  });
});

//Roles can do...
const checkUserIsAuthorized = (user, res, roles) => {
  if (user && roles.includes(user.role)) {
    return true;
  } else if (user && roles.includes("self:" + user.id)) {
    // "self:" + req.params.id --- Delete my acc
    return true;
  } else if (user) {
    res.status(401).json({
      message: "Not authorized",
      type: "role",
    });
  } else {
    res.status(401).json({
      message: "Not logged in",
      type: "login",
    });
  }
};

//Show stats
app.get("/stats", (req, res) => {
  // if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
  //   return;
  // }
  const sql = `
  SELECT 'Authors' AS name, COUNT(*) AS count, NULL AS stats
  FROM authors
  UNION
  SELECT 'Books', COUNT(*), MAX(pages)
  FROM books
  UNION
  SELECT 'Heroes', COUNT(*), SUM(good)
  FROM heroes
  `;
  //Union
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

//Show authors
app.get("/authors", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const sql = "SELECT * FROM authors";
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result); //Json return authors
    }
  });
});

//Show books
app.get("/books", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const sql =
    // Author_id - for edit dropdown
    `
  SELECT b.id, title, pages, genre, name, surname, author_id 
  FROM books as b
  LEFT JOIN authors as a ON b.author_id = a.id
  `;
  //Left join
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result); //Json return authors
    }
  });
});

//Show heroes
app.get("/heroes", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const sql = `
  SELECT
  h.id, h.name,
  a.name AS authorName, a.surname AS authorSurname,
  good, title, book_id, h.image
  
  FROM heroes as h
  LEFT JOIN books as b
  ON h.book_id = b.id
  LEFT JOIN authors as a
  ON b.author_id = a.id
  ORDER BY h.id DESC
  `;
  //Double left join
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

//Create authors
app.post("/authors", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const { name, surname, nickname, born } = req.body;
  //Validation
  if (!name || !surname || !born) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Name, surname and born are required.",
      },
    });
    return;
  }
  //SQL
  const sql =
    "INSERT INTO authors (name, surname, nickname, born) VALUES (?,?,?,?)";
  connection.query(sql, [name, surname, nickname, born], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: result.insertId,
        uuid: req.body.id,
        message: { type: "success", text: "Author added!" },
      });
    }
  });
});

//Create books
app.post("/books", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const { title, pages, genre, author_id } = req.body;
  //Validation
  if (!title || !pages || !genre || !author_id) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Title, pages, genre and author are required.",
      },
    });
    return;
  }
  //Slug
  const slug = title.toLowerCase().replace(/ /g, "-");
  //Create
  const sql =
    "INSERT INTO books (title, pages, genre, author_id, url) VALUES (?,?,?,?,?)";
  connection.query(
    sql,
    [title, pages, genre, author_id, slug],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          success: true,
          id: result.insertId,
          uuid: req.body.id,
          message: { type: "success", text: "Book added!" },
        });
      }
    }
  );
});

//Create hero
app.post("/heroes", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  //Create image
  const filename = writeImage(req.body.image);

  const { name, good, book_id } = req.body;
  //Validation
  if (!name || ![0, 1].includes(good) || !book_id) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Name, good/bad are book required.",
      },
    });
    return;
  }
  const sql =
    "INSERT INTO heroes (name, good, book_id, image) VALUES (?,?,?,?)";
  connection.query(
    sql,
    [name, good, book_id, filename !== null ? "imagesHero/" + filename : null],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({
          success: true,
          id: result.insertId,
          uuid: req.body.id,
          message: { type: "success", text: "Hero created!" },
        });
      }
    }
  );
});

//Edit authors
app.put("/authors/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const { name, surname, nickname, born } = req.body;
  //Validation
  if (!name || !surname || !born) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Name, surname and born are required.",
      },
    });
    return;
  }
  //SQL
  const sql = `UPDATE authors SET name = ?, surname = ?, nickname = ?, born=? WHERE id = ?`;
  connection.query(
    sql,
    [name, surname, nickname, born, req.params.id],
    (err) => {
      if (err) {
        req.status(500).send(err);
      } else {
        res.json({
          seccess: true,
          id: +req.params.id,
          message: { type: "success", text: "Author updated!" },
        });
      }
    }
  );
});

//Edit books
app.put("/books/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const { title, pages, genre, author_id } = req.body;
  //Validation
  if (!title || !pages || !genre || !author_id) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Title, pages, genre and author are required.",
      },
    });
    return;
  }
  //Slug
  const slug = title.toLowerCase().replace(/ /g, "-");
  //SQL;
  const sql = `UPDATE books SET title = ?, pages = ?, genre = ?, author_id=?, url = ? WHERE id = ?`;
  connection.query(
    sql,
    [title, pages, genre, author_id, slug, req.params.id],
    (err) => {
      if (err) {
        req.status(500).send(err);
      } else {
        res.json({
          seccess: true,
          id: +req.params.id,
          message: { type: "success", text: "Book updated!" },
        });
      }
    }
  );
});

//Edit heroes
app.put("/heroes/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  if (req.body.del) {
    deleteImage(req.params.id);
  }
  const filename = writeImage(req.body.image);

  const { name, good, book_id } = req.body;
  //Validation
  if (!name || ![0, 1].includes(good) || !book_id) {
    res.status(422).json({
      message: {
        type: "danger",
        text: "Name, good/bad are book required.",
      },
    });
    return;
  }
  //SQL;
  let sql;
  let params;
  if (req.body.del || filename !== null) {
    sql =
      "UPDATE heroes SET name = ?, good = ?, book_id = ?, image = ? WHERE id = ?";
    params = [
      name,
      good,
      book_id,
      filename !== null ? "imagesHero/" + filename : null,
      req.params.id,
    ];
  } else {
    sql = "UPDATE heroes SET name = ?, good = ?, book_id = ? WHERE id = ?";
    params = [name, good, book_id, req.params.id];
  }

  connection.query(sql, params, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: "success", text: "Heroes Uodated!" },
      });
    }
  });
});

//Delete author
app.delete("/authors/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  const sql = "DELETE FROM authors WHERE id = ?";
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      if (err.errno === 1451) {
        res.status(422).json({
          message: {
            type: "danger",
            text: "You can not delete this author. There are books assigned to him",
          },
        });
      } else {
        res.status(500).send(err);
      }
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: "danger", text: "Author deleted!" },
      });
    }
  });
});

//Delete book
app.delete("/books/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  let sql;
  sql = "SELECT image FROM heroes WHERE book_id = ?"; //Delete image from heroe
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      results.forEach((hero) => {
        if (hero.image) {
          if (hero.image) {
            fs.unlinkSync("public/" + hero.image);
          }
        }
      });
    }
  });

  sql = "DELETE FROM books WHERE id = ?"; //Delete book from DB
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: "danger", text: "Book deleted! All heroes gone!" },
      });
    }
  });
});

//Delete heroes
app.delete("/heroes/:id", (req, res) => {
  if (!checkUserIsAuthorized(req.user, res, ["admin", "user", "animal"])) {
    return;
  }
  //Delete image
  deleteImage(req.params.id);

  const sql = "DELETE FROM heroes WHERE id = ?";
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: "danger", text: "Heroe deleted!" },
      });
    }
  });
});

app.listen(port, () => {
  console.log(`books server on ${port} port.`);
});
