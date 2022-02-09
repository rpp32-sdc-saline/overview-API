const { Pool } = require("pg");

const pool = new Pool({
  user: "josephnahm",
  password: null,
  host: "localhost",
  port: 5432,
  database: "sdc2",
});

pool.getProducts = async function (page, count) {
  const products = await pool.query(
    "SELECT id, name, slogan, description, category, default_price FROM products ORDER BY id OFFSET $1 LIMIT $2",
    [(page - 1) * count, count]
  );
  return products.rows;
};

pool.getProduct = async function (product_id) {
  const product = await pool.query("SELECT * FROM products WHERE id = $1", [
    product_id,
  ]);
  return product.rows;
};

pool.getStyle = async function (product_id) {
  const style = await pool.query(
    'SELECT style_id, name, original_price, sale_price, "default?", photos, skus FROM styles WHERE product_id = $1 ORDER BY style_id',
    [product_id]
  );
  return style.rows;
};

module.exports = { pool };
