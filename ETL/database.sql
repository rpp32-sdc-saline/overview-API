CREATE DATABASE sdc2;

\c sdc2;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS styles;

CREATE TABLE products (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT,
  features jsonb
);

CREATE TABLE styles (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  name TEXT,
  sale_price INT,
  original_price INT,
  default_style boolean,
  photos jsonb,
  skus jsonb
);
