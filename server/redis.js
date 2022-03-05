const redis = require('redis');
const deployed = process.env.IPS;

if (deployed) {
  const redisHost = JSON.parse(process.env.IPS).redisIP;
  const redisPwd = JSON.parse(process.env.IPS).redisPwd;

  module.exports = redis.createClient({url: `redis://default:${redisPwd}@${redisHost}:6379`});
} else {
  module.exports = redis.createClient(6379);
}

