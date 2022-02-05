const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { Pool, Client } = require("pg");
const format = require("pg-format");
const process = require("process");

const pool = new Pool({
  user: "josephnahm",
  password: null,
  host: "localhost",
  port: 5432,
  database: "sdc2",
  idleTimeoutMillis: 0,
});

var data = [];
var curr = 1;

(async () => {
  const client = await pool.connect();
  try {
    const readable = fs
      .createReadStream(path.resolve(__dirname, "..", "csv", "features.csv"))
      .pipe(csv.parse({ headers: true, ignoreEmpty: true }))
      .on("error", (error) => {
        console.error(error);
        process.exit();
      })
      .on("data", async (row) => {
        try {
          const id = parseInt(row.product_id);
          if (id !== curr) {
            readable.pause();
            await client.query(
              "UPDATE products SET features = $1 WHERE id=$2",
              [JSON.stringify(data), curr]
            );
            console.log(curr);
            readable.resume();
            data = [];
            curr = id;
          }
          data.push({
            feature: row.feature,
            value: row.value !== "null" ? row.value : null,
          });
        } catch (error) {
          console.error(error.message);
          process.exit();
        }
      })
      .on("end", async (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        client.release();
        process.exit();
      });
  } catch (e) {
    throw e;
  }
})().catch((e) => console.error(e.stack));
