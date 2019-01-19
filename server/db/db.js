// const cassandra = require('cassandra-driver');

// const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'amazon', localDataCenter: 'datacenter1' } );

const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';
const pool = new Pool({
  host: 'localhost',
  database: 'amazon',
  max: 300,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
});

// client.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('connected to cassandra');
// });

// const read = (query, cb) => {
//   // const categoryParam = req.params.category.toLowerCase();
//   const queryString = `SELECT * FROM ${query.toLowerCase()[0]} WHERE keyword= '${query.toLowerCase()}' LIMIT 10`;
//   client.execute(queryString, (err, results) => {
//     if (err) {
//       return console.error(err);
//     }
//     cb(null, results.rows);
//   });
// };

// client.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('connected to psql');
// });

const read = (query, cb) => {
  // const categoryParam = req.params.category.toLowerCase();
  // const strings = query.split(' ')
  const queryString = `SELECT * FROM ${query.toLowerCase()[0]} WHERE keyword = '${query.toLowerCase()}' and popularity > 99 LIMIT 10`;
  pool.query(queryString, (err, results) => {
    if (err) {
      return console.error(err);
    }
    cb(null, results.rows);
  });
};

module.exports = {
  read,
};
