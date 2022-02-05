CREATE TABLE photos (
  id TEXT,
  styleId TEXT,
  url TEXT,
  thumbnail_url TEXT
);

\copy photos FROM 'csv/photos.csv' WITH (format csv, header);

ALTER TABLE photos ALTER COLUMN id TYPE INT USING id::integer;
ALTER TABLE photos ALTER COLUMN styleId TYPE INT USING styleId::integer;