const redis = require('redis');
const redisHost = JSON.parse(process.env.IPS).redis;

//local redis server
// module.exports = redis.createClient(6379);

//remote server
module.exports = redis.createClient({url: `redis://default@${redisHost}:6379`});