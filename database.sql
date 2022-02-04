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

-- CREATE TABLE features (
--   id TEXT PRIMARY KEY,
--   product_id TEXT REFERENCES products(id),
--   feature TEXT,
--   "value" TEXT
-- );

-- CREATE TABLE styles (
--   id TEXT PRIMARY KEY,
--   product_id TEXT REFERENCES products (id),
--   "name" TEXT,
--   sale_price TEXT,
--   original_price TEXT,
--   default_style TEXT
-- );

-- CREATE TABLE skus (
--   id TEXT PRIMARY KEY,
--   style_id TEXT REFERENCES styles (id),
--   size TEXT,
--   quantity TEXT
-- );

-- \copy products FROM 'csv/product.csv' WITH (format csv, header);
-- \copy features FROM 'csv/features.csv' WITH (format csv, header);
-- \copy styles FROM 'csv/styles.csv' WITH (format csv, header);
-- \copy skus FROM 'csv/skus.csv' WITH (format csv, header);