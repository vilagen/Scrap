const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models")
const cors = require("cors");
const app = express();
// const axios = require("axios");

// App Setup
app.use(morgan('combined')); 
app.use(cors());
app.use(express.json());
app.use(routes);

// app.use(express.json())
// app.use(bodyParser.json({ type: `*/*` }))
// app.use(express.urlencoded({ extended: true }));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const syncOptions = { force: false };

// connection to Redis

const redisClient = require('redis').createClient(process.env.REDIS_URL);
redisClient.auth(redisURL.auth.split(":")[1]);

// connection to heroku postgres

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// axios.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })

client.connect();

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  API server now on http://localhost:${PORT}`);
  });
});