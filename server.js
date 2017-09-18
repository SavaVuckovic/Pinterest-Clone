const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');

// initialize the express application
const app = express();

// view engine setup
app.set('view engine', 'html');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', (req, res) => {
	res.render('index', {
    title: 'Index'
  });
});

// start the server
app.listen(3333, () => console.log('Listening on port 3333...'));
