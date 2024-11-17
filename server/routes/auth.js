const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getCsrfToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

// route =>   POST /api/signup
// desc =>    Register a new user
router.post("/signup", registerUser);

// route =>   POST /api/signin
// desc =>    Authenticate user and set token in cookie
router.post("/signin", loginUser);

// route =>   POST /api/logout
// desc =>    Logout user by clearing the token cookie

router.post("/logout", protect, logoutUser);

// route =>   GET /api/user
// desc =>    Get current logged-in user
router.get("/user", protect, getCurrentUser);

// route =>   GET /api/csrf-token
// desc =>    Get CSRF token
router.get("/csrf-token", getCsrfToken);

module.exports = router;
