const controllers = require('./controller/postgres/psql.controller');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


// STATIC FILES
app.use(express.static(path.join(__dirname, '..', 'public')));

// MIDDLEWARE
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(cors());

// ROUTES
// app.use('/categories', categoriesRouter);
app.get('/products/:category/:query', controllers.read);

// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
