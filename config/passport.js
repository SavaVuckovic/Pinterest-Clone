const localStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('./database');

module.exports = function(passport) {
  // passport local strategy
  passport.use(new localStrategy(
    { usernameField: 'email' },
    (username, password, done) => {
    let sql = 'SELECT id, password FROM users WHERE email = ?';
    db.query(sql, [username], (err, results, fields) => {
      if(err) {
        return done(err);
      }
      if(results.length === 0) {
        return done(null, false);
      } else {
        // compare the password with the hashed one in the database
        const hash = results[0].password.toString();
        bcrypt.compare(password, hash, (err, response) => {
          // passwords match, login the user
          if(response === true) {
            return done(null, { user_id: results[0].id })
          } else {
            return done(null, false);
          }
        });
      }
    });
  }));

  // serialize and deserialize user
  passport.serializeUser((user_id, done) => {
    done(null, user_id);
  });

  passport.deserializeUser((user_id, done) => {
    done(null, user_id);
  });
}
