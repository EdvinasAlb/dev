const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'forest2'
})
const app = express();
const port = 3001;

app.use(cors());
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();


const checkUserIsLogged = (user, res) => {
  if (user) {
    return true;
  } else {
    res.status(401).json({ 
      message: 'Not logged in',
      status: 'login' 
    });
  }
}

const checkUserIsAuthorized = (user, res, roles) => {
  if (user && roles.includes(user.role)) {
    return true;
  } else if (user && roles.includes('self:' + user.id)) {
    return true;
  } else if (user) {
    res.status(401).json({ 
      message: 'Not authorized',
      status: 'role' 
    });
  } else {
    res.status(401).json({ 
      message: 'Not logged in',
      status: 'login' 
    });
  }
}


// router

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Bebrai!');
});



const doAuth = (req, res, next) => {

  const token = req.query.token || req.body.token || '';

  if (token === '') {
    return next();
  }

  const sql = `
    SELECT users.name, users.id, users.role
    FROM sessions
    LEFT JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = ? AND sessions.time > ?
  `;
  const time = Date.now() - 1000 * 60 * 60 * 24;
  connection.query(sql, [token, time], (err, results) => {
    if (err) {
      res.status(500);
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

app.get('/fruits', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin', 'user', 'animal'])) {
    return;
  }

  const sql = 'SELECT * FROM fruits';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  });
});


app.post('/fruits', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin', 'user'])) {
    return;
  }

  const { name, color, form } = req.body;
  const sql = 'INSERT INTO fruits (name, color, form ) VALUES (?, ?, ?)';
  connection.query(sql, [name, color, form], (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: result.insertId, uuid: req.body.id });
    }
  });
});

app.put('/fruits/:id', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin', 'user'])) {
    return;
  }

  const { name, color, form } = req.body;
  const sql = 'UPDATE fruits SET name = ?, color = ?, form = ? WHERE id = ?';
  connection.query(sql, [name, color, form, req.params.id], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});


app.delete('/fruits/:id', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin'])) {
    return;
  }

  const sql = 'DELETE FROM fruits WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  connection.query(sql, [username, md5(password)], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Server error 1' });
    } else {
      if (results.length > 0) {
        const token = md5(uuidv4());
        const sql = 'INSERT INTO sessions (id, user_id, time) VALUES (?, ?, ?)';
        connection.query(sql, [token, results[0].id, Date.now()], (err) => {
          if (err) {
            res.status(500);
          } else {
            res.json({ success: true, token, name: results[0].name, role: results[0].role, id: results[0].id});
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid name or password' });
      }
    }
  });

});

// Register

app.post('/users', (req, res) => {

  const { name, password } = req.body;
  const sql = 'INSERT INTO users (name, password, role ) VALUES (?, ?, ?)';
  connection.query(sql, [name, md5(password), 'animal'], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true});
    }
  });
});


// Users CRUD

app.get('/users', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin'])) {
    return;
  }

  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  });
});

app.delete('/users/:id', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin', 'self:' + req.params.id])) {
    return;
  }

  const sql = 'DELETE FROM users WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});


app.put('/users/:id', (req, res) => {

  if (!checkUserIsAuthorized(req.user, res, ['admin'])) {
    return;
  }

  const { role } = req.body;
  const sql = 'UPDATE users SET role = ? WHERE id = ?';
  connection.query(sql, [role, req.params.id], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});




app.listen(port, () => {
  console.log(`FRUITŲ SERVERIS klauso ${port} porto.`);
});