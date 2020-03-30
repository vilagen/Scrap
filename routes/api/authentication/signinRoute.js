const router = require("express").Router();
const signinController = require("../../../controllers/signin");

// Matches "api/signin"
router.route("/")
  .post(signinController.handleSignin);

module.exports = router;