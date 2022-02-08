const { Pool } = require("pg");

const pool = new Pool({
  user: "josephnahm",
  password: null,
  host: "localhost",
  port: 5432,
  database: "sdc2",
  // idleTimeoutMillis: 0,
});

module.exports = pool;
