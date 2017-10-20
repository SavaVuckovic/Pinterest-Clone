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

/* Pins */
router.get('/pin/:id', (req, res) => {
  Pin.findOne({ _id: req.params.id })
    .populate('author')
    .populate('comments.commentAuthor')
    .then((pin) => {
      res.render('pin', { pin })
    })
});

router.put('/pin/edit/:id', requireAuth, (req, res) => {
  Pin.findOne({ _id: req.params.id })
    .then((pin) => {
      let allowComments;

      if(req.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }

      pin.body = req.body.body;
      pin.status = req.body.status;
      pin.allowComments = allowComments;

      pin.save()
        .then((pin) => {
          req.flash('success_msg', 'Pin Edited');
          res.redirect('/home');
        })
    })
});

router.delete('/pin/delete/:id', requireAuth, (req, res) => {
  Pin.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Pin Deleted Successfully');
      res.redirect('/home');
    });
});

router.post('/pin/add', requireAuth, (req, res) => {
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
          req.flash('success_msg', 'Pin successfully created');
          res.redirect(`/pin/${pin._id}`)
        });

      }
    }
  });
});

// Comments

router.post('/pin/comment/:id', (req, res) => {
  Pin.findOne({ _id: req.params.id })
    .then((pin) => {
      const newComment = {
        commentBody: req.body.commentBody,
        commentAuthor: req.user.id,
      }

      pin.comments.unshift(newComment);
      pin.save()
        .then((pin) => {
          req.flash('Comment Added');
          res.redirect(`/pin/${pin.id}`);
        })
    })
});

module.exports = router;
