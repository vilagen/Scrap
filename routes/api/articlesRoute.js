const router = require("express").Router();
const userArticles = require("../../controllers/artciles");

// Matches with "api/articles"
router.route("/")
  .post(userArticles.saveArticle)

router.route("/:id")
  .delete(userArticles.deleteArticle)

module.exports = router;