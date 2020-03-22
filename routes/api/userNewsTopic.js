const router = require("express").Router();
const userNewsController = require("../../controllers/news");

// Matches with "api/topic"
router.route("/:query")
  .get(userNewsController.newsTopicResults);

module.exports = router;