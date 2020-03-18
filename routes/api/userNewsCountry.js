const router = require("express").Router();
const countryNewsController = require("../../controllers/news");

// Matches with "api/country"
router.route("/")
  .get(countryNewsController.userNewsCountry);

module.exports = router;