const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

const pool = new Pool({
  host: '54.183.229.187',
  port: 5432,
  database: 'amazon',
  user: 'power_user',
  password: '$poweruserpassword',
  max: 300,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  console.log('connected to postgres');
});

module.exports = {
  pool,
};
