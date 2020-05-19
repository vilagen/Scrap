require('dotenv').config()

module.exports = {
  // "development": {
  //   "username": "david",
  //   "password": "secret",
  //   "database": "scrap-docker",
  //   "host": "postgres",
  //   "dialect": "postgres",

  "development": {
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "host": 'postgres',
    "dialect": 'postgres',
    "logging": true,
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
    "username": process.env.HEROKUPG_USER,
    "password": process.env.HEROKUPG_PASSWORD,
    "database": process.env.HEROKUPG_DB,
    "host": process.env.HEROKUPG_HOST,
    "dialect": "postgres",
    "operatorsAliases": false,
    "use_env_variable": "DATABASE_URL"
  }
};

// require('dotenv').config();

// const db_password = process.env.DB_PASS

// module.exports = {

//   "development": {
//     "username": "postgres",
//     "password": db_password,
//     "database": "scrap",
//     "host": "localhost",
//     "dialect": "postgres",

//   // "development": {
//   //   "username": process.env.POSTGRES_USER,
//   //   "password": process.env.POSTGRES_PASSWORD,
//   //   "database": process.env.POSTGRES_DB,
//   //   "host": 'localhost',
//   //   "dialect": 'postgres',
//   //   "logging": true,
//   },

//   "test": {
//     "username": "postgres",
//     "password": db_password,
//     "database": "scrap",
//     "host": "localhost",
//     "dialect": "postgres",
//   },

//   "production": {
//     "use_env_variable": "JAWSDB_URL",
//     "dialect": "postgres",
//     "operatorsAliases": false
//   }
// }