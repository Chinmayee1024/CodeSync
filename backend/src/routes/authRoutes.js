const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");
const {
  runPython,
  runDart,
  runJava,
  runC,
} = require("../controller/compilerController");

// Public
router.get("/", (req, res) => {
  res.send("Welcome to the Home page from auth.js");
});

// Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Code Runners
router.post("/runpy", runPython);
router.post("/rundart", runDart);
router.post("/runjava", runJava);
router.post("/runc", runC);

module.exports = router;
