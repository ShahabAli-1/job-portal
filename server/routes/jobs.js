const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private
router.post("/", protect, createJob);

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Private
router.get("/", protect, getJobs);

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private
router.put("/:id", protect, updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private
router.delete("/:id", protect, deleteJob);

module.exports = router;
