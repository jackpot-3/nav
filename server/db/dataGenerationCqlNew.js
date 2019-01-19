const faker = require('faker');
const cassandra = require('cassandra-driver');
const Uuid = require('cassandra-driver').types.Uuid;

const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'amazon', localDataCenter: 'datacenter1' } );

const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];
const writer = async (batch) => {
  let queryString = 'BEGIN BATCH \n';
  const count = 100 * batch;
  for (let i = count; i < count + 100; i++) {
    const id = i;
    const productName = faker.commerce.productName() + " " + id;
    const names = productName.split(' ');
    const category = categoryNames[faker.random.number(4)];
    const popularity = faker.random.number(100);
    for (let n = 0; n < names.length - 1; n++) {
      const keyword = names[n].toLowerCase();
      const char = keyword[0];
      const time = Uuid.random();
      queryString += `INSERT INTO ${char} (id, product_id, product_name, keyword, category, popularity) VALUES (${time}, ${id}, '${productName}', '${keyword}', '${category}', ${popularity}); \n`;
    }
  }
  queryString += 'APPLY BATCH;';
  await client.execute(queryString);
  if (batch === 99999) {
    for (let j = 97; j < 123; j++) {
      const queryString = `create index ${String.fromCharCode(j)}_keyword_index on ${String.fromCharCode(j)} (keyword)`;
      client.execute(queryString, (err) => {
        if (err) {
          return console. error(err);
        }
      });
      const queryString2 = `create index ${String.fromCharCode(j)}_category_index on ${String.fromCharCode(j)} (category)`;
      client.execute(queryString2, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log(j);
      });
    }
  }
};

const createBatch = async () => {
  for (let i = 0; i < 100000; i++) {
    console.log(i);
    await writer(i);
  }
}

const setup = async () => {

  for (let j = 97; j < 123; j++) {
    let queryString = `drop table IF EXISTS ${String.fromCharCode(j)}`;
    await client.execute(queryString);
    queryString = `CREATE TABLE IF NOT EXISTS ${String.fromCharCode(j)} (id uuid PRIMARY KEY, product_id int, product_name text, keyword text, category text, popularity int)`;
    await client.execute(queryString);
  }
  createBatch();
};

setup();

// const addIndex = async () => {  
//   for (let j = 97; j < 123; j++) {
//     const queryString = `create index IF NOT EXISTS ${String.fromCharCode(j)}_keyword_index on ${String.fromCharCode(j)} (keyword)`;
//     await client.execute(queryString);
//     const queryString2 = `create index IF NOT EXISTS ${String.fromCharCode(j)}_category_index on ${String.fromCharCode(j)} (category)`;
//     await client.execute(queryString2);
//   }
// };
// addIndex();