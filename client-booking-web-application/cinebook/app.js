const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(3000, function() {
  console.log('Cinema server running at http://localhost:3000');
});

module.exports = app;
