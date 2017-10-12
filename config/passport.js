const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');
const keys = require('./keys');
// strategies
const localStrategy = require('passport-local');




module.exports = function(passport) {
  // local strategy
  passport.use(new localStrategy(
    // use email instead of username (passports default)
    { usernameField: 'email' },
    (email, password, done) => {
      // check if user exists in the database
      User.findOne({ email })
        .then((user) => {
          // user doesn't exist
          if(!user) {
            return done(null, false, { message: 'no user found' });
          }
          // check the password
          bcrypt.compare(password, user.password, (err, matches) => {
            if(err) {
              next(err);
            }
            // passwords match
            if(matches) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        });
    }
  ));

  // serialize
  passport.serializeUser((user_id, done) => {
    done(null, user_id);
  });

  // deserialize
  passport.deserializeUser((user_id, done) => {
    User.findById(id)
      .then((user) => done(null, user));
  });
}
