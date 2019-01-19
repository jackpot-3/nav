const { db } = require('../../db/db');

const create = (data) => {
  const queryString = 'INSERT INTO products (id, name, categoryid, popularity) VALUES (?, ?, ?, ?)';
  const params = Object.values(data);
  console.log(params);
  db.execute(queryString, params, { prepare: true }, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const read = (req, res) => {
  // const categoryParam = req.params.category.toLowerCase();

  console.log(db);
  const { query } = req.params;
  console.log(query);
  const queryString = `SELECT * FROM ${query.toLowerCase()[0]} WHERE keyword= '${query.toLowerCase()}' LIMIT 10`;
  db.execute(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const update = (id, data) => {
  const params = Object.values(data);
  const queryString = `UPDATE products SET name = '${params[0]}', categoryid = ${params[1]}, \
  popularity = ${params[2]} WHERE id = ${id}`;
  db.execute(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const deleteOne = (id) => {
  const queryString = `DELETE FROM products WHERE id = ${id}`;
  db.execute(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

module.exports = {
  create,
  read,
  update,
  deleteOne,
}