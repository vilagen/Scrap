require('dotenv').config()

module.exports = {
  "development": {
    "username": "david",
    "password": "secret",
    "database": "scrap-docker",
    "host": "localhost",
    "dialect": "postgres",

  // "development": {
  //   "username": process.env.POSTGRES_USER,
  //   "password": process.env.POSTGRES_PASSWORD,
  //   "database": process.env.POSTGRES_DB,
  //   "host": process.env.POSTGRES_HOST,
  //   "dialect": 'postgres',
  //   "logging": true
  },

  "test": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": process.env.POSTGRES_HOST,
    "dialect": "postgres",
    "operatorsAliases": false
  },

  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "postgres",
    "operatorsAliases": false
  }
};