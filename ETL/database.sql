CREATE DATABASE sdc;

\c sdc;

DROP TABLE IF EXISTS products;



CREATE TABLE products (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price INT,
  features jsonb
);

id,productId,name,sale_price,original_price,default_style

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

CREATE TABLE features (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  feature TEXT NOT NULL,
  value TEXT
);

CREATE TABLE skus (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

CREATE TABLE photos (
  id INT UNIQUE NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  url TEXT,
  thumbnail_url TEXT
);
