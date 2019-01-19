const { db, read } = require('./db/db');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();


// STATIC FILES
app.get(express.static(path.join(__dirname, '..', 'public')));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(cors());

// ROUTES
// app.use('/categories', categoriesRouter);
app.get('/products/:category/:query', (req, res) => {
  const { query } = req.params;
  read(query, (err, products) => {
    if (err) {
      throw err;
    }
    // console.log(products);
    res.status(200).send({ products });
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Not found');
});


module.exports = app;
