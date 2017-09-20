const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
require('dotenv').config({path: './config/.env'});


// initialize the express application
const app = express();

// require routes
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');

// view engine setup
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// serve favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// static files
app.use(express.static(path.join(__dirname, 'public')));

// body parser & express validator
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

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// send user and authentication status with every response
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user || null;
  next();
});

// routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// start the server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server started on port ${ PORT }`));
