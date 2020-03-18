const router = require("express").Router();
const topicNewsController = require("../../controllers/news");

// Matches with "api/userNews"
router.route("/")
  .get(topicNewsController.userNewsSearch);

module.exports = router;