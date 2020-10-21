const router = require("express").Router();
const profile = require("../../controllers/profile");
// const updateProfile = require("../../controllers/profile");

// matches with "api/profile:id"
router.route("/:id")
  .get(profile.handleProfileGet);

router.route("/:id")
  .post(profile.handleProfileUpdate);

module.exports = router;