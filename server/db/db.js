const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

const pool = new Pool({
  host: 'localhost',
  database: 'amazon',
  // max: 300,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
});

module.exports = {
  pool,
};
