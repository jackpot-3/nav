const faker = require('faker');
const fs = require('file-system');

const printer = () => {
  const writeStream = fs.createWriteStream('./data2.csv');
  writeStream.write('id,productName,categoryId,popularity\n');
  let i = 0;
  const max = 1e7;
  const writer = () => {
    let result = true;
    while (i < max && result) {
      if (i % 1000000 === 0) {
        console.log('1M');
      }
      const data = [];
      const productName = faker.commerce.productName() + i;
      const categoryId = faker.random.number(4);
      const popularity = faker.random.number(100);
      data.push(i, productName, categoryId, popularity);
  
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