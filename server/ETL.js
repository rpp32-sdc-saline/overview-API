const fs = require("fs");
const { Pool } = require("pg");
const fastcsv = require("fast-csv");

var stream = fs.createReadStream("csv/example.csv");
var csvData = [];
var csvStream = fastcsv
  .parse()
  .on("data", (data) => csvData.push(data))
  .on("end", () => {
    csvData.shift();

    const pool = new Pool({
      user: "josephnahm",
      password: null,
      host: "localhost",
      port: 5432,
      database: "overview",
    });

    const query =
      "INSERT INTO features (product_id, feature, value) VALUES ($1, $2, $3)";

    (async () => {
      const client = await pool.connect();
      try {
        csvData.forEach(async (row) => {
          const fields = [parseInt(row[1]), ...row.slice(2)];
          const res = await client.query(query, fields);
        });
      } finally {
        client.release();
      }
    })().catch((err) => console.log(err.stack));
  });
stream.pipe(csvStream);
