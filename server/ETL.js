//Too slow

// const fs = require("fs");
// const { Pool } = require("pg");
// const fastcsv = require("fast-csv");

// var stream = fs.createReadStream("csv/product.csv");
// var csvData = [];
// var csvStream = fastcsv
//   .parse()
//   .on("data", (data) => csvData.push(data))
//   .on("end", () => {
//     csvData.shift();

//     const pool = new Pool({
//       user: "josephnahm",
//       password: null,
//       host: "localhost",
//       port: 5432,
//       database: "overview",
//     });

//     const query =
//       "INSERT INTO products (name, slogan, description, category, default_price) VALUES ($1, $2, $3, $4, $5)";

//     (async () => {
//       const client = await pool.connect();
//       try {
//         csvData.forEach(async (row) => {
//           const fields = [...row.slice(1, -1), parseInt(row[row.length - 1])];
//           const res = await client.query(query, fields);
//         });
//       } finally {
//         client.release();
//       }
//     })().catch((err) => console.log(err.stack));
//   });
// stream.pipe(csvStream);
