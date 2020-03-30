const router = require("express").Router();
const userNewsController = require("../../../controllers/news");

// Matches with "api/topiceverything"
router.route("/:query")
  .get(userNewsController.newsTopicEverything);

module.exports = router;