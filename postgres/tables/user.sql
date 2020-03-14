BEGIN TRANSACTION;

CREATE TABLE users (
  id serial PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  saved_entries BIGINT DEFAULT 0,
  joined TIMESTAMP NOT NULL,
);

COMMIT;