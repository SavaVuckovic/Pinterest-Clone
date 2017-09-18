var express = require('express');
var router = express.Router();

// register
router.post('/register', (req, res, next) => {
  res.send('REGISTER');
});

// login
router.post('/login', (req, res, next) => {
  res.send('LOGIN');
});

module.exports = router;
