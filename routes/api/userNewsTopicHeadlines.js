const router = require("express").Router();
const userNewsController = require("../../controllers/news");

// Matches with "api/topicheadlines"
router.route("/:query")
  .get(userNewsController.newsTopicHeadlines);

module.exports = router;