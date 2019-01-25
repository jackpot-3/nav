const redis = require('redis');
const client = redis.createClient(6379,'13.57.202.125');

client.on('connect', (err) => {
  if (err) {
    throw err;
  }
  console.log('Redis client connected');
});

client.on('error', (err) => {
  console.log('Something went wrong ' + err);
});

module.exports = client;
