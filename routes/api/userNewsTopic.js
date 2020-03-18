const router = require("express").Router();
const userNewsController = require("../../controllers/news");

// Matches with "api/topic"
router.route("/")
  .get(userNewsController.userNewsTopic);

module.exports = router;