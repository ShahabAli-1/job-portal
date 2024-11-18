const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Configure CORS to allow credentials and specific origin
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(cookieParser());

// CSRF Protection
const csrfProtection = csurf({
  cookie: false,
});

// Apply CSRF protection to state-changing routes
// For APIs, CSRF protection is typically applied to POST, PUT, DELETE requests
app.use("/api", csrfProtection);

// Routes
const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");

app.use("/api", authRoutes);
app.use("/api/jobs", jobRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Job Portal API is running");
});

// Error Handling Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
