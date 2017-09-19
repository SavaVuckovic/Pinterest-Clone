const express = require('express');
const router = express.Router();
const db = require('../db');

// register
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  let sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result, fields) => {
    if(err) throw err;
    res.render('welcome', {
      title: 'Registration successful'
    });
  });
});

// login
router.post('/login', (req, res, next) => {
  res.send('LOGIN');
});

module.exports = router;
