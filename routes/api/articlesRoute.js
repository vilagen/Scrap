const router = require("express").Router();
const userArticles = require("../../controllers/artciles");

// Matches with "api/articles"
router.route("/")
  .get(userArticles.getAuthTokenId);

module.exports = router;