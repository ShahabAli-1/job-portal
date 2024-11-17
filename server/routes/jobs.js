const express = require("express");
const router = express.Router();
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// route =>   POST /api/jobs
// desc =>    Create a new job
router.post("/", protect, createJob);

// route =>   GET /api/jobs
// desc =>    Get all jobs
router.get("/", protect, getJobs);

// route =>   PUT /api/jobs/:id
// desc =>    Update a job
router.put("/:id", protect, updateJob);

// route =>   DELETE /api/jobs/:id
// desc =>    Delete a job
router.delete("/:id", protect, deleteJob);

module.exports = router;
