const { pool } = require('../../db/db');
//const redis = require('../../../redis');

module.exports.create = (req, res) => {
  const names = req.body.product_name.split(' ');
  const data = req.body;
  let queryString = '';
  for (let n = 0; n < names.length - 1; n++) {
    const keyword = names[n].toLowerCase();
    const char = keyword[0];
    queryString += `INSERT INTO ${char} (product_id, product_name, keyword, category, popularity) VALUES (${data.product_id}, '${data.product_name}', '${keyword}', '${data.ategory}', ${data.popularity}); \n`;
  }
  pool.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
    res.status(201).send();
  });
};

module.exports.read = (req, res) => {
  const { query } = req.params;
  const strings = ['car', 'bacon', 'cotton', 'awesome', 'bike', 'intelligent', 'concrete', 'fresh', 'tasty', 
  'metal', 'wooden', 'unbranded', 'practical', 'handmade', 'Tasty', 'Steel', 'Ergonomic', 'Gorgeous', 'computer', 
  'gloves', 'Granite', 'Table', 'Salad', 'Towels', 'Shoes', 'small', 'refined'];
  // console.log(products);
  // const categoryParam = req.params.category.toLowerCase();
  // const strings = query.split(' ')
  const queryString = `SELECT * FROM ${strings[query].toLowerCase()[0]} WHERE keyword = '${strings[query].toLowerCase()}' and popularity > 99 ORDER BY RANDOM() LIMIT 10`;
      pool.query(queryString, (err, results) => {
        if (err) {
          return console.error(err);
        }
        // if (results.rows.length > 0) {
        //   redis.set(query, JSON.stringify(results.rows), 'EX', 120);
        // }
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
