const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const { page = 1, count = 5 } = req.query;
    const allProducts = await pool.query(
      "SELECT id, name, slogan, description, category, default_price FROM products ORDER BY id OFFSET $1 LIMIT $2",
      [(page - 1) * count, count]
    );
    res.json(allProducts.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/products/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      product_id,
    ]);
    res.json(product.rows);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/products/:product_id/styles", async (req, res) => {
  try {
    const { product_id } = req.params;
    const style = await pool.query(
      'SELECT style_id, name, original_price, sale_price, "default?", photos, skus FROM styles WHERE product_id = $1 ORDER BY style_id',
      [product_id]
    );
    res.json({ product_id, results: style.rows });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

module.exports = app;
