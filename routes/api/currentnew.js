const router = require("express").Router();
const currentnewsController = require("../../controllers/news");

// Matches with "api/currentnews"
router.route("/")
  .get(currentnewsController.current)
