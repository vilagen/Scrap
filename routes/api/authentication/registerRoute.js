const router = require("express").Router();
const userRegister = require("../../../controllers/register");

// routing to api/register
router.route("/")
  .post(userRegister.handleRegister);

module.exports = router