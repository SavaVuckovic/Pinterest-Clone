const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
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

// routes
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
	res.render('welcome', {
    title: 'Welcome'
  });
});

// start the server
app.listen(3333, () => console.log('Listening on port 3333...'));
