const express = require("express");

module.exports = function (pool) {
  const app = express();
  app.use(express.json());

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
      console.log(err.message);
      res.status(400).send(err.message);
    }
  });

  return app;
};
