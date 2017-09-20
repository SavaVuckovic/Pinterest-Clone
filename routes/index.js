const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

/* Welcome page */
router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    res.render('welcome', {
      title: 'Welcome'
    });
  }
});

/* Home page */
router.get('/home', authMiddleware, (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

module.exports = router;
