const router = require('express').Router();
const requireAuth = require('../helpers/requireAuth');
const Pin = require('../models/pin');
const upload = require('../config/multer');

// post pin (for creating a new pin)
router.post('/add', requireAuth, (req, res) => {
  // uploading the pin image
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
        let allowComments = req.body.allowComments ? true : false;

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

// get individual pin page
router.get('/:id', (req, res) => {
  Pin.findOne({ _id: req.params.id })
    .populate('author')
    .populate('comments.commentAuthor')
    .sort({ date: 'desc' })
    .then((pin) => {
      res.render('pin', { pin });
    });
});

// put pin (for updating pins)
router.put('/edit/:id', requireAuth, (req, res) => {
  // NEEDS TO BE IMPROVED
  Pin.findOne({ _id: req.params.id })
    .then((pin) => {
      pin.body = req.body.body;
      pin.status = req.body.status;
      pin.allowComments = req.body.allowComments ? true : false;

      pin.save()
        .then((pin) => {
          req.flash('success_msg', 'Pin Edited');
          res.redirect(`/pin/${req.params.id}`);
        });
    });
});

// delete pin
router.delete('/delete/:id', requireAuth, (req, res) => {
  // NEEDS TO BE IMPROVED
  Pin.remove({ _id: req.params.id })
    .then(() => {
      req.flash('success_msg', 'Pin Deleted Successfully');
      res.redirect('/home');
    });
});



// post a comment
router.post('/:id/comment/add', requireAuth, (req, res) => {
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
        });
    });
});

// delete a comment
router.delete('/:id/comment/delete', requireAuth, (req, res) => {
  Pin.findOne({ _id: req.params.id })
    .then((pin) => {
      pin.comments = pin.comments.filter((comment) => {
        return comment.id !== req.body.deleteID;
      });

      pin.save()
        .then((pin) => {
          req.flash('Comment Deleted');
          res.redirect(`/pin/${pin.id}`);
        });
    });
});

module.exports = router;
