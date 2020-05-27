BEGIN TRANSACTION;

CREATE TABLE article (
  id serial PRIMARY KEY,
  author VARCHAR(255),
  title VARCHAR(255),
  image VARCHAR(500),
  description text,
  url VARCHAR(500),
  published VARCHAR(255),
);

COMMIT;