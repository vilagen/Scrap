const router = require("express").Router();
const currentNewsRoutes = require("./currentnews");
const topicHeadlinesNewsRoutes = require("./userNews/userNewsTopicHeadlines");
const topicEverythingNewsRoutes = require("./userNews/userNewsTopicEverything");
const countryNewsRoutes = require("./userNews/userNewsCountry");
const userNewsRoutes = require("./userNews/userNewsSearch");
const register = require("./authentication/registerRoute");
const signin = require("./authentication/signinRoute");
const signout = require("./authentication/signoutRoute");
const { response } = require("express");
// const signinRoutes = require("./signin");

// news API routes
router.use("/currentnews", currentNewsRoutes);
router.use("/topicheadlines", topicHeadlinesNewsRoutes);
router.use("/topiceverything", topicEverythingNewsRoutes);
// router.use("/country", countryNewsRoutes);
// router.use("/userNews", userNewsRoutes);

// register router
router.use("/register", register)

// // signin route
// router.use("/signin", signinRoutes);

// signout route
router.use("/signout", signout)

module.exports = router;