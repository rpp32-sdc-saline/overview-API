CREATE DATABASE overview;

\c overview;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS features;


CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT
);

CREATE TABLE features (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products(id),
  feature TEXT,
  "value" TEXT
);

CREATE TABLE styles (
  id TEXT PRIMARY KEY,
  product_id TEXT REFERENCES products (id),
  "name" TEXT,
  sale_price TEXT,
  original_price TEXT,
  default_style TEXT
);

CREATE TABLE skus (
  id TEXT PRIMARY KEY,
  style_id TEXT REFERENCES styles (id),
  size TEXT,
  quantity TEXT
);

\copy products FROM 'csv/product.csv' WITH (format csv, header);
\copy features FROM 'csv/features.csv' WITH (format csv, header);
\copy styles FROM 'csv/styles.csv' WITH (format csv, header);
\copy skus FROM 'csv/skus.csv' WITH (format csv, header);