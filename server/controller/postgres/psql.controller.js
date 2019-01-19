const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

const client = new pg.Client(connectionString);

client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  }
  console.log('connected');
});

const create = (data) => {
  const queryString = 'INSERT INTO products (id, name, categoryid, popularity) VALUES ($1, $2, $3, $4)';
  const params = Object.values(data);
  console.log(params);
  client.query(queryString, params, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const read = (name) => {
  const queryString = `SELECT * FROM products WHERE name = '${name}'`;
  client.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const update = (id, data) => {
  const params = Object.values(data);
  const queryString = `UPDATE products SET, name = '${params[0]}', categoryid = ${params[1]}, \
  popularity = ${params[2]} WHERE id = ${id}`;
  client.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const deleteOne = (id) => {
  const queryString = `DELETE FROM products WHERE id = ${id}`;
  client.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
}