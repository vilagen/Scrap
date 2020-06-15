const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./models")
const cors = require("cors");
const app = express();

// App Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined')); 
app.use(cors());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// app.use(express.json())
// app.use(bodyParser.json({ type: `*/*` }))
// app.use(express.urlencoded({ extended: true }));

app.use(routes);

// connection to heroku postgres

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  API server now on http://localhost:${PORT}`);
  });
});