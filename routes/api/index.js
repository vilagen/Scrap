const router = require("express").Router();
const currentNewsRoutes = require("./currentnews");
// const signupRoutes = require("./signup");
// const signinRoutes = require("./signin");

// news API routes
router.use("/currentnews", currentNewsRoutes);

// // signup route
// router.use("/signup", signupRoutes);

// // signin route
// router.use("/signin", signinRoutes);

module.exports = router;