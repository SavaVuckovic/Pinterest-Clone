const express = require('express');
const router = express.Router();
//const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const db = require('../db');

/* Register */
router.post('/register', [
  // validate form values
    check('username').isLength({ min: 4, max: 20 }).withMessage('Username must be between 4-20 characters long.'),
    check('email').isEmail().withMessage('The email you entered is invalid, please try again.'),
    check('email').isLength({ min: 4, max: 100 }).withMessage('Email address must be between 4-100 characters long, please try again.'),
    check('password', 'Password must be at least 10 characters long and contain one number').isLength({ min: 10 }).matches(/\d/),
    check('password2', 'Passwords do not match, please try again.').exists().custom((value, { req }) => value === req.body.password)
  ],
  (req, res, next) => {
    //req.assert('password2', 'Passwords do not match, please try again.').equals(req.body.password);
    //let mappedErrors = req.validationErrors(true);
    // check for validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      // return errors to the user
      return res.status(422).json({ errors: errors.mapped() });
    } else {
      // extract form values
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      // if the values are valid, insert the new user into the database
      let sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(sql, [username, email, password], (err, result, fields) => {
        if(err) throw err;
        res.render('welcome', {
          title: 'Registration successful'
        });
      });
    }
});

/* Login */
router.post('/login', (req, res, next) => {
  res.send('LOGIN');
});

module.exports = router;
