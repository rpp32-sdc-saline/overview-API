const express = require("express");
const cors = require("cors");

module.exports = function (pool) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.get("/overview/:product_id", async (req, res) => {
    try {
      const { product_id } = req.params;
      const product = await pool.getProduct(product_id);
      const style = await pool.getStyle(product_id);
      res.json({ product, styles: { product_id, results: style } });
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
