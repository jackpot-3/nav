const pg = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';
const client = new pg.Client(connectionString);
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
    client.query('CREATE TABLE IF NOT EXISTS products(id INT PRIMARY KEY, name VARCHAR(43) NOT NULL, categoryId Integer, popularity Integer)', (err) => {
      if (err) {
        console.error(err);
      }
      client.query("COPY products(id, name, categoryId, popularity) FROM '/Users/jacky/documents/HR/SDC/vrtobar-service/data2.csv' DELIMITER ',' CSV HEADER", (err) => {
        if (err) {
          console.error(err);
        }
        client.query('CREATE TABLE IF NOT EXISTS categories(id INTEGER PRIMARY KEY, category VARCHAR(32))', (err) => {
          if (err) {
            throw err;
          }
          client.query("INSERT INTO categories (id, category) VALUES (0, 'electronics'), (1, 'clothes'), (2, 'games'), (3, 'appliances'), (4, 'books')", (err) => {
            if (err) {
              throw err;
            }
            client.end();
          });
        });
      });
    });
  }
});
