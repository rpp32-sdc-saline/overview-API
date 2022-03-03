const redis = require('redis');
const redisHost = JSON.parse(process.env.IPS).redisIP;
const redisPwd = JSON.parse(process.env.IPS).redisPwd;

//local redis server
// module.exports = redis.createClient(6379);

//remote server
module.exports = redis.createClient({url: `redis://default:${redisPwd}@${redisHost}:6379`});