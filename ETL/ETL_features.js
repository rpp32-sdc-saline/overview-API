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
  database: "sdc",
  idleTimeoutMillis: 0,
});

var data = [];

(async () => {
  const client = await pool.connect();
  try {
    console.log("1");
    const readable = fs
      .createReadStream(path.resolve(__dirname, "..", "csv", "features.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        console.error(error.message);
        process.exit();
      })
      .on("data", async (row) => {
        try {
          data.push([
            parseInt(row.id),
            parseInt(row.product_id),
            row.feature,
            row.value,
          ]);
          if (data.length === 100) {
            readable.pause();
            await client.query(
              format(
                "INSERT INTO features (id,productid,feature, value) VALUES %L",
                data
              )
            );
            readable.resume();
            console.log(data[0][0]);
            data = [];
          }
        } catch (error) {
          console.error(error.message);
          process.exit();
        }
      })
      .on("end", async (rowCount) => {
        await client.query(
          format(
            "INSERT INTO features (id,productid,feature, value) VALUES %L",
            data
          )
        );
        console.log(`Parsed ${rowCount} rows`);
        client.release();
        process.exit();
      });
  } catch (e) {
    throw e;
  }
})().catch((e) => console.error(e.stack));
