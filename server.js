const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
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
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.render('welcome', {
    title: 'Welcome'
  });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

// start the server
app.listen(3333, () => console.log('Listening on port 3333...'));
