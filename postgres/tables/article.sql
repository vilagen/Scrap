BEGIN TRANSACTION;

CREATE TABLE article (
  id serial PRIMARY KEY,
  source VARCHAR(255),
  author VARCHAR(100),
  title VARCHAR(150),
  image VARCHAR(255),
  description text,
  url VARCHAR(255),
  published VARCHAR(100),
);

COMMIT;