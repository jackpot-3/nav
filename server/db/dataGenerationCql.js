const faker = require('faker');
const fs = require('file-system');

const printer = () => {
  const categoryNames = ['electronics', 'clothes', 'games', 'appliances', 'books'];
  const writeStream = fs.createWriteStream('./cql2.csv');
  writeStream.write('name,category,popularity\n');
  let i = 0;
  const max = 5e7;
  const writer = () => {
    let result = true;
    while (i < max && result) {
      const data = [];
      const productName = faker.commerce.productName() + i;
      const category = categoryNames[faker.random.number(4)];
      const popularity = faker.random.number(100);
      data.push(productName, category, popularity);
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