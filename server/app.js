const express = require("express");
const cors = require("cors");
const client = require("./redis");
const fs = require("fs");
client.on("error", (err) => console.log("Redis Client Error", err));
const loaderToken = process.env.IPS && JSON.parse(process.env.IPS).loaderToken;

(async () => {
  await client.connect();
})();

module.exports = function (pool) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //generates a random id middleware
  function randomid(req, res, next) {
    req.params = { product_id: Math.floor(Math.random() * 1000012).toString() };
    next();
  }

  //Cache middleware
  async function cache(req, res, next) {
    const { product_id } = req.params;
    const value = await client.get(product_id);
    if (value) {
      res.send(JSON.parse(value));
    } else {
      next();
    }
  }

  app.get("/", (req, res) => {
    res.send("Welcome to the Overview API");
  });

  app.get(`/${loaderToken}`, (req, res) => {
    fs.writeFile(__dirname + "/loader.txt", loaderToken, "utf-8", function (err, data) {
      if (err) throw err;
      res.sendFile(__dirname + "/loader.txt");
    });
  });

  app.get("/overview/test", [randomid, cache], async (req, res) => {
    try {
      const { product_id } = req.params;
      const product = await pool.getProduct(product_id);
      const style = await pool.getStyle(product_id);
      const data = { product, styles: { product_id, results: style } };
      await client.set(product_id, JSON.stringify(data));
      res.json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.get("/overview/:product_id", cache, async (req, res) => {
    try {
      const { product_id } = req.params;
      const product = await pool.getProduct(product_id);
      const style = await pool.getStyle(product_id);
      const data = { product, styles: { product_id, results: style } };
      await client.set(product_id, JSON.stringify(data));
      res.json(data);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.get("/products", async (req, res) => {
    try {
      const { page = 1, count = 5 } = req.query;
      const allProducts = await pool.getProducts(page, count);
      res.json(allProducts);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.get("/products/:product_id", async (req, res) => {
    try {
      const { product_id } = req.params;
      const product = await pool.getProduct(product_id);
      res.json(product);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  app.get("/products/:product_id/styles", async (req, res) => {
    try {
      const { product_id } = req.params;
      const style = await pool.getStyle(product_id);
      res.json({ product_id, results: style });
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

  return app;
};
