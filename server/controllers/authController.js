const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// desc =>    Register a new user
// route =>   POST /api/signup
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    return next(new Error("Please enter all fields"));
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      return next(new Error("User already exists"));
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    if (user) {
      // Generate token
      const token = generateToken(user._id);

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Set to true in production
        // sameSite: "strict",
        // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(400);
      return next(new Error("Invalid user data"));
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>    Authenticate user & set token in cookie
// route =>   POST /api/signin
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return next(new Error("Please enter all fields"));
  }

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      // Set token in HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production", // Set to true in production
        // sameSite: "strict",
        // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });

      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      res.status(401);
      return next(new Error("Invalid email or password"));
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>    Logout user by clearing the token cookie
// route =>   POST /api/logout
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    // expires: new Date(0),
    // sameSite: "strict",
    // secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
};

// desc =>    Get current logged-in user
// route =>   GET /api/user
const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      return next(new Error("User not found"));
    }
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>    Get CSRF token
// route =>   GET /api/csrf-token
const getCsrfToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getCsrfToken,
};
