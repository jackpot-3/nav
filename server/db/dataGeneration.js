const faker = require('faker');
const fs = require('file-system');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';

const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];


const printer = () => {
  const writeStream = fs.createWriteStream('./data.csv');
  writeStream.write('productName,categoryId,popularity\n');
  let i = 0;
  const max = 1e7;
  const writer = () => {
    let result = true;
    while (i < max && result) {
      if (i % 1000000 === 0) {
        console.log('1M');
      }
      const data = [];
      const productName = faker.commerce.productName() + 'i';
      const categoryId = faker.random.number(4);
      const popularity = faker.random.number(100);
      data.push([productName, categoryId, popularity]);
      result = writeStream.write(data.join(',') + '\n');
      i++;
    }
    if (i < max) {
      writeStream.once('drain', writer);
    }
  };
  writer();
};
printer();

const client = new pg.Client(connectionString);

setTimeout(() => {
  client.connect((err) => {
    if (err) {
      console.error('connection error', err.stack);
    } else {
      console.log('connected');
      client.query('CREATE TABLE products(id SERIAL PRIMARY KEY, name VARCHAR(43) NOT NULL, categoryId Integer, popularity Integer)', (err) => {
        if (err) {
          console.error(err);
        }
        client.query("COPY products(name, categoryId, popularity) FROM '/Users/jacky/documents/code/SDC/vrtobar-service/data.csv' DELIMITER ',' CSV HEADER", (err) => {
          if (err) {
            console.error(err);
          }
          client.end();
        });
      });
    }
  });
}, 30000);
