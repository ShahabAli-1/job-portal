const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      return next(new Error("Not authorized, token failed"));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, no token"));
  }
};

module.exports = { protect };