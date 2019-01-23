const pg = require('pg');
const faker = require('faker');

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/amazon';
const client = new pg.Client({
  host: 'localhost',
  database: 'amazon',
  user: 'power_user',
  password: '$poweruserpassword'
});
client.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  }
});

const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];
const writer = async (batch) => {
  let queryString = '';
  const count = 1000 * batch;
  for (let i = count; i < count + 1000; i++) {
    const id = i;
    const productName = faker.commerce.productName() + " " + id;
    const names = productName.split(' ');
    const category = categoryNames[faker.random.number(4)];
    const popularity = faker.random.number(50) + faker.random.number(50);
    for (let n = 0; n < names.length - 1; n++) {
      const keyword = names[n].toLowerCase();
      const char = keyword[0];
      queryString += `INSERT INTO ${char} (product_id, product_name, keyword, category, popularity) VALUES (${id}, '${productName}', '${keyword}', '${category}', ${popularity}); \n`;
    }
  }
  await client.query(queryString);
};

const addIndex = async () => {  
  for (let j = 97; j < 123; j++) {
    const keywordIndex = `create index ${String.fromCharCode(j)}_keyword_index on ${String.fromCharCode(j)} (keyword)`;
    await client.query(keywordIndex);
    const categoryIndex = `create index ${String.fromCharCode(j)}_category_index on ${String.fromCharCode(j)} (category)`;
    await client.query(categoryIndex);
    const popularityIndex = `create index ${String.fromCharCode(j)}_popularity_index on ${String.fromCharCode(j)} (popularity)`;
    await client.query(popularityIndex);
    console.log(j);
  }
  console.log('done');
};

const createBatch = async (batch) => {
  for (let i = 0; i < batch; i++) {
    console.log(i);
    await writer(i);
  }
  addIndex();
}

const setup = async () => {

  for (let j = 97; j < 123; j++) {
    let queryString = `drop table IF EXISTS ${String.fromCharCode(j)}`;
    await client.query(queryString);
    queryString = `CREATE TABLE IF NOT EXISTS ${String.fromCharCode(j)} (product_id int, product_name text, keyword text, category text, popularity int)`;
    await client.query(queryString);
  }
  createBatch(10000);
};

//setup();
addIndex();

