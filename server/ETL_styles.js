// UPDATE products SET features = features || '{"example":"test","joe":"schmo"}' ::jsonb WHERE id=1000013;

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
    const readable = fs
      .createReadStream(path.resolve(__dirname, "..", "csv", "styles.csv"))
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", async (row) => {
        try {
          data.push([
            parseInt(row.id),
            parseInt(row.productId),
            row.name,
            parseInt(row.sale_price) || null,
            parseInt(row.original_price),
            parseInt(row.default_style) ? true : false,
            "[]",
            "[]",
          ]);
          if (data.length === 100) {
            readable.pause();
            await client.query(
              format(
                "INSERT INTO styles (id,productId,name,sale_price,original_price,default_style,photos,skus) VALUES %L",
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
            "INSERT INTO styles (id,productId,name,sale_price,original_price,default_style,photos,skus) VALUES %L",
            data
          )
        );
        console.log(`Parsed ${rowCount} rows`);
        client.release();
        return;
      });
  } catch (e) {
    throw e;
  }
})().catch((e) => console.error(e.stack));
