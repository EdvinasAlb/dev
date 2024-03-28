const mysql = require("mysql");
const md5 = require("md5");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the database!");
});

//Create
// Users
const createUsersTable = (_) => {
  const sql = `
     CREATE TABLE IF NOT EXISTS users(
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     session CHAR(32) NULL,
     email VARCHAR(100) NOT NULL UNIQUE,
     role ENUM('admin', 'user', 'lib') NOT NULL DEFAULT 'user',
     password VARCHAR(32) NOT NULL
     )`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table created");
  });
};

// Authors
const createAuthorsTable = (_) => {
  const sql = `
     CREATE TABLE IF NOT EXISTS authors(
     id INT AUTO_INCREMENT PRIMARY KEY,
     url VARCHAR(200) NOT NULL UNIQUE,
     name VARCHAR(100) NOT NULL,
     surname VARCHAR(100) NOT NULL,
     nickname VARCHAR(100) NULL,
     born DATE NOT NULL
    )`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Authors table created");
  });
};

// Books
const createBooksTable = (_) => {
  const sql = `
     CREATE TABLE IF NOT EXISTS books(
     id INT AUTO_INCREMENT PRIMARY KEY,
     url VARCHAR(200) NOT NULL UNIQUE,
     ratings TEXT default '[]',
     title VARCHAR(100) NOT NULL,
     pages INT(5) NOT NULL,
     genre VARCHAR(100) NOT NULL,
     author_id INT NOT NULL,
     FOREIGN KEY (author_id) REFERENCES authors(id)
    )`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Books table created");
  });
};

//Heroes
const createHeroesTable = (_) => {
  const sql = `
     CREATE TABLE IF NOT EXISTS heroes(
     id INT AUTO_INCREMENT PRIMARY KEY,
     url VARCHAR(200) NOT NULL UNIQUE,
     name VARCHAR(100) NOT NULL,
     good BOOLEAN NOT NULL DEFAULT 1,
     image VARCHAR(200) NULL,
     book_id INT NOT NULL,
     FOREIGN KEY (book_id) REFERENCES books(id)
    )`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Heroes table created");
  });
};

//Delete
//Users
const dropUsersTable = (_) => {
  const sql = "DROP TABLE IF EXISTS users";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table dropped");
  });
};

//Authors
const dropAuthorsTable = (_) => {
  const sql = "DROP TABLE IF EXISTS authors";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Authors table dropped");
  });
};

//Books
const dropBooksTable = (_) => {
  const sql = "DROP TABLE IF EXISTS books";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Books table dropped");
  });
};

//Heroes
const dropHeroesTable = (_) => {
  const sql = "DROP TABLE IF EXISTS heroes";
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Heroes table dropped");
  });
};

//Seed users table
const seedUsersTable = (_) => {
  const sql = `INSERT INTO users (name,email,role, password) VALUES
    ('Briedis','briedis@gmail.com','admin','${md5("123")}'),
    ('Bebras', 'bebras@gmail.com', 'user', '${md5("123")}'),
    ('Barsukas', 'barsukas@gmail.com', 'lib', '${md5("123")}')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Users table seeded");
  });
};

//Seed authors table
const seedAuthorsTable = (_) => {
  const sql = `INSERT INTO authors (name,surname,nickname, born, url) VALUES
    ('J.R.R.','Tolkien','Tolkinas','1892-01-03', 'jhon-tolkin'),
    ('J.K.','Rowling',NULL,'1865-07-31', 'rowling'),
    ('Stephen','King',"King",'1848-09-20', 'stephen-king'),
    ('George R.R.','Martin','Martin','1848-09-20', 'george-martin'),
    ('J.R.R.', 'Martin','Cyborg', '1948-09-20', 'martin')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Authors table seeded");
  });
};

//Seed books table
const seedBooksTable = (_) => {
  const sql = `INSERT INTO books (title,pages,genre, author_id, url) VALUES
  ('Hobitas', 1256, 'Fantasy', 1, 'hobit'),
  ('Harry Potter', 587, 'Fantasy', 2, 'harry-potter'),
  ('The Shining', 310, 'Horror', 3, 'the-shining'),
  ('A Game of Thrones', 562, 'Fantasy', 4, 'a-game-of-thrones'),
  ('A Clash of Kings', 865, 'Drama', 5, 'a-clash-of-kings'),
  ('A Storm of Swords', 987, 'Fantasy', 5, 'a-strom-of-swords'),
  ('A Feast for Crows', 654, 'Sci-fi', 3, 'a-feast-for-crowns'),
  ('A Dance with Dragons', 789, 'Comedy', 5, 'a-dance-with-dragons'),
  ('The Winds of Winter', 1234, 'Fantasy', 2, 'the-winds-of-winter'),
  ('A Dream of Spring', 987, 'Fantasy', 5, 'a-dream-of-spring'),
  ('The Lord of the Rings', 1256, 'Sci-fi', 1, 'the-lord-of-the-rings'),
  ('The Silmarillion', 587, 'Fantasy', 4, 'the-silmarillion'),
  ('The Children of Hurin', 310, 'Drama', 2, 'the-children-of-hurin'),
  ('Unfinished Tales', 562, 'Fantasy', 1, 'unfinished-tales'),
  ('The History of Middle-earth', 865, 'Fantasy', 1, 'the-history-of-middle-earth')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Books table seeded");
  });
};

//Seed heroes table
const seedHeroesTable = (_) => {
  const sql = `INSERT INTO heroes (name, good, image, book_id, url) VALUES 
    ('Frodo Baggins', 1, 'imagesHero/01.jpg', 1, 'frodo-baggins'),
    ('Samwise Gamgee', 1, 'imagesHero/02.jpg', 15, 'samwise-gamgee'),
    ('Gandalf', 1, NULL, 1, 'gandalf'),
    ('Harry Potter', 0, 'imagesHero/03.jpg', 12, 'harry-potter'),
    ('Hermione Granger', 1, 'imagesHero/04.jpg', 12, 'hermione-grenger'),
    ('Ron Weasley', 0, 'imagesHero/05.jpg', 2, 'ron-weasley'),
    ('Jack Torrance', 0, NULL, 3, 'jack-torrance'),
    ('Wendy Torrance', 1, 'imagesHero/06.jpg', 6, 'wendy-torrance'),
    ('Danny Torrance', 0, 'imagesHero/07.png', 3, 'danny-torrance'),
    ('Ned Stark', 1, 'imagesHero/08.jpg', 4, 'ned-stark'),
    ('Catelyn Stark', 0, 'imagesHero/09.jpg', 4, 'catelyn-stark'),
    ('Robb Stark', 1, 'imagesHero/10.jpg', 4, 'robb-stark'),
    ('Tyrion Lannister', 1, 'imagesHero/11.jpg', 4, 'tyrion-lanister'),
    ('Daenerys Targaryen', 1, 'imagesHero/12.jpg', 4, 'daenerys-targaryen'),
    ('Jon Snow', 1, 'imagesHero/13.jpg', 4, 'jon-snow'),
    ('Cersei Lannister', 0, 'imagesHero/14.jpg', 4, 'cersei-lannister'),
    ('Jaime Lannister', 0, 'imagesHero/15.png', 4, 'jamie-lanister')
    `;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("Heroes table seeded");
  });
};
//Drop all
const dropAllTables = (_) => {
  dropUsersTable();
  dropHeroesTable();
  dropBooksTable();
  dropAuthorsTable();
};

//Create All
const createAllTables = (_) => {
  createUsersTable();
  createAuthorsTable();
  createBooksTable();
  createHeroesTable();
};

// Seed all table
const seedAllTables = (_) => {
  seedUsersTable();
  seedAuthorsTable();
  seedBooksTable();
  seedHeroesTable();
};

dropAllTables();
createAllTables();
seedAllTables();

connection.end();
