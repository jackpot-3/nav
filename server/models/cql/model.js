const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'amazon', localDataCenter: 'datacenter1' } );

const create = (data) => {
  const queryString = 'INSERT INTO products (id, name, categoryid, popularity) VALUES (?, ?, ?, ?)';
  const params = Object.values(data);
  console.log(params);
  client.execute(queryString, params, { prepare: true }, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const read = (name) => {
  const queryString = `SELECT * FROM products WHERE name = '${name}'`;
  client.execute(queryString, (err, results) => {
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
  client.execute(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};

const deleteOne = (id) => {
  const queryString = `DELETE FROM products WHERE id = ${id}`;
  client.execute(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    console.log(results);
  });
};