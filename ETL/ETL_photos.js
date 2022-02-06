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
      .createReadStream(path.resolve(__dirname, "..", "csv", "photos.csv"))
      .pipe(csv.parse({ headers: true, quote: null }))
      .on("error", (error) => {
        console.error(error);
        process.exit();
      })
      .on("data", async (row) => {
        try {
          const id = parseInt(row.styleId);
          if (id !== curr) {
            readable.pause();
            await client.query("UPDATE styles SET photos = $1 WHERE id=$2", [
              JSON.stringify(data),
              curr,
            ]);
            console.log(curr);
            readable.resume();
            data = [];
            curr = id;
          }
          data.push({
            url: JSON.parse(row.url),
            thumbnail_url: JSON.parse(row.thumbnail_url),
          });
        } catch (error) {
          data.push({
            url: JSON.parse(row.url),
            thumbnail_url: row.thumbnail_url.slice(1),
          });
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
