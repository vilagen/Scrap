const router = require("express").Router();
const currentNewsRoutes = require("./currentnews");
const topicNewsRoutes = require("./userNewsTopic");
const countryNewsRoutes = require("./userNewsCountry");
const userNewsRoutes = require("./userNewsSearch");
// const signupRoutes = require("./signup");
// const signinRoutes = require("./signin");

// news API routes
router.use("/currentnews", currentNewsRoutes);
router.use("/topic", topicNewsRoutes);
router.use("/country", countryNewsRoutes);
router.use("/userNews", userNewsRoutes);

// // signup route
// router.use("/signup", signupRoutes);

// // signin route
// router.use("/signin", signinRoutes);

module.exports = router;