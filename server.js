const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local');
const authMiddleware = require('./middlewares/auth');
require('dotenv').config();


// initialize the express application
const app = express();

// require routes
const authRoutes = require('./routes/auth');

// view engine setup
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// sessions & passport
const storeOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
var sessionStore = new MySQLStore(storeOptions);

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
}));
app.use(passport.initialize());
app.use(passport.session());

// passport local strategy
passport.use(new localStrategy((username, password, done) => {
  const db = require('./db');
  let sql = 'SELECT id, password FROM users WHERE username = ?';
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

// send authentication status with every response
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.render('welcome', {
    title: 'Welcome'
  });
});

app.get('/dashboard', authMiddleware(), (req, res) => {
  res.render('dashboard');
});

// start the server
app.listen(3333, () => console.log('Listening on port 3333...'));
