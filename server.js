const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');

const routes = require("./routes");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models")

const cors = require("cors");

// App Setup
app.use(morgan('combined')); 
app.use(cors());
// app.use(express.json())
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: `*/*` }))
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const syncOptions = { force: false };

db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(`==> 🌎  API server now on http://localhost:${PORT}`);
  });
});