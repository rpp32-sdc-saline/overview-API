const express = require("express");
const cors = require("cors");
const client = require("./redis");

(async () => {await client.connect()})();


module.exports = function (pool) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  //Cache middleware
  async function cache(req, res, next) {
    const { product_id } = req.params;
    const value = await client.get(product_id);
    if (value) {
      res.send(JSON.parse(value))
    } else{
      next()
    }
  }

  app.get("/", (req, res) => {
    res.send("Welcome to the Overview API");
  })

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
