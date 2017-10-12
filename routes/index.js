const router = require('express').Router();
const requireAuth = require('../helpers/requireAuth');

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
router.get('/home', requireAuth, (req, res) => {
  res.render('home', {
    title: 'Home'
  });
});

module.exports = router;
