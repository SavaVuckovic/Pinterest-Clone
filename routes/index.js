const router = require('express').Router();
const requireAuth = require('../helpers/requireAuth');
const Pin = require('../models/pin');

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

/* Pins */
router.post('/pins/add', requireAuth, (req, res) => {
  let allowComments;

  if(req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }

  const pin = new Pin({
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    author: req.user.id
  });

  pin.save().then((pin) => {
    console.log(pin)
    req.flash('Pin successfully created');
    res.redirect(`/pins/${pin._id}`)
  })
});

module.exports = router;
