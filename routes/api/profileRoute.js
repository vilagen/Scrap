const router = require("express").Router();
const profile = require("../../controllers/profile");
// const updateProfile = require("../../controllers/profile");

// matches with "api/profile:id"
router.route("/:id")
  .get(profile.handleProfileGet);

router.route("/:id")
  .post(profile.handleProfileUpdate);

// matches with api/profile/saveEntries:id
router.route("/saveEntries/:id")
  .post(profile.incrementEntries);

// matches with api/profile/delEntries:id
router.route("/delEntries/:id")
  .post(profile.decrementEntries);

  module.exports = router;