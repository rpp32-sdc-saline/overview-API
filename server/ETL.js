const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");
const { Pool, Client } = require("pg");
const process = require("process");

const pool = new Pool({
  user: "josephnahm",
  password: null,
  host: "localhost",
  port: 5432,
  database: "sdc",
  idleTimeoutMillis: 0,
});

(async () => {
  const client = await pool.connect();
  try {
    const queryText =
      "INSERT INTO products (id,name,slogan,description,category,default_price) VALUES($1,$2,$3,$4,$5,$6)";
    fs.createReadStream(path.resolve(__dirname, "..", "csv", "product.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", async (row) => {
        try {
          await client.query(queryText, [
            parseInt(row.id),
            row.name,
            row.slogan,
            row.description,
            row.category,
            parseInt(row.default_price),
          ]);
          console.log(row.id);
        } catch (error) {
          console.error(error.message);
          process.exit();
        }
      })
      .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
})().catch((e) => console.error(e.stack));
