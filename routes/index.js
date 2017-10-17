const router = require('express').Router();
const requireAuth = require('../helpers/requireAuth');
const Pin = require('../models/pin');
// test
const upload = require('../config/multer');

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
  upload(req, res, (err) => {

    if(err){
      req.flash('error_msg', err);
      res.redirect('/home');
    } else {
      if(req.file == undefined){
        req.flash('error_msg', 'No file selected!');
        res.redirect('/home');
      } else {

        // successfully uploaded, save pin to the database
        let allowComments;

        if(req.body.allowComments) {
          allowComments = true;
        } else {
          allowComments = false;
        }

        const pin = new Pin({
          image: req.file.filename,
          body: req.body.body,
          status: req.body.status,
          allowComments: allowComments,
          author: req.user.id
        });

        pin.save().then((pin) => {
          console.log(pin)
          req.flash('Pin successfully created');
          res.redirect(`/pins/${pin._id}`)
        });

      }
    }
  });


});

module.exports = router;
