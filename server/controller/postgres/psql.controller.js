const { pool } = require('../../db/db');


module.exports.create = (data) => {
  const queryString = 'INSERT INTO products (id, name, categoryid, popularity) VALUES ($1, $2, $3, $4)';
  const params = Object.values(data);
  console.log(params);
  pool.query(queryString, params, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

module.exports.read = (req, res) => {
  const { query } = req.params;
  // console.log(products);
  // const categoryParam = req.params.category.toLowerCase();
  // const strings = query.split(' ')
  const queryString = `SELECT * FROM ${query.toLowerCase()[0]} WHERE keyword = '${query.toLowerCase()}' and popularity > 99  ORDER BY RANDOM() LIMIT 10`;
  pool.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    // pool.end();
    // cb(null, results.rows);
    console.log(results.rows);
    res.status(200).send(results.rows);
  });
};

module.exports.update = (id, data) => {
  const params = Object.values(data);
  const queryString = `UPDATE products SET, name = '${params[0]}', categoryid = ${params[1]}, \
  popularity = ${params[2]} WHERE id = ${id}`;
  pool.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

module.exports.deleteOne = (id) => {
  const queryString = `DELETE FROM products WHERE id = ${id}`;
  pool.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
}