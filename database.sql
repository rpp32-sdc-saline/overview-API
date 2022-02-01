CREATE DATABASE overview;

\c overview;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS styles;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS features;


CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price INTEGER NOT NULL
);

CREATE TABLE features (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id SERIAL REFERENCES products(id),
  feature TEXT NOT NULL,
  "value" TEXT
);

CREATE TABLE styles (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id SERIAL REFERENCES products (id),
  "name" TEXT NOT NULL,
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE skus (
  id SERIAL NOT NULL PRIMARY KEY,
  style_id SERIAL REFERENCES styles (id),
  size TEXT,
  quantity INTEGER
);

