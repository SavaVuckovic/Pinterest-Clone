const router = require('express').Router();
const requireAuth = require('../helpers/requireAuth');
const Pin = require('../models/pin');
const User = require('../models/user');

/* Welcome page */
router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    Pin.find({ status: 'public' })
      .then((pins) => {
        res.render('welcome', {
          title: 'Welcome',
          pins
        });
      });
  }
});

/* Home page */
router.get('/home', requireAuth, (req, res) => {
  Pin.find({ status: 'public' })
    .then((pins) => {
      res.render('home', {
        title: 'Home',
        pins
      });
    });
});

/* User */
router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      Pin.find({
        status: 'public',
        author: user._id
      })
      .then((pins) => {
        res.render('user', { user, pins });
      })
    })
});


module.exports = router;
