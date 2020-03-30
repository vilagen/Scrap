const router = require("express").Router();
const userSignout = require("../../../controllers/signout");

// to match api "api/signout"
router.route("/")
  .post(userSignout.handleSignout);

  module.exports = router