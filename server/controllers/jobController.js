const Job = require("../models/Job");

// desc =>    Create a new job
// route =>   POST /api/jobs
const createJob = async (req, res, next) => {
  const { title, description, company, location } = req.body;

  if (!title || !description || !company || !location) {
    res.status(400);
    return next(new Error("Please enter all fields"));
  }

  try {
    const newJob = await Job.create({
      title,
      description,
      company,
      location,
      postedBy: req.user._id,
    });

    const savedJob = await newJob.save();
    const populatedJob = await savedJob.populate("postedBy", "username email");
    res.status(201).json(populatedJob);
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>   Get all jobs
// route =>   GET /api/jobs
const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "username email")
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>    Update a job
// route =>   PUT /api/jobs/:id
const updateJob = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, company, location } = req.body;

  try {
    const job = await Job.findById(id);

    if (!job) {
      res.status(404);
      return next(new Error("Job not found"));
    }

    // Check if the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error("Not authorized to update this job"));
    }

    // Update fields if provided
    if (title) job.title = title;
    if (description) job.description = description;
    if (company) job.company = company;
    if (location) job.location = location;

    const updatedJob = await job.save();
    const populatedUpdatedJob = await updatedJob.populate(
      "postedBy",
      "username email"
    );
    res.status(201).json(populatedUpdatedJob);
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

// desc =>    Delete a job
// route =>   DELETE /api/jobs/:id
const deleteJob = async (req, res, next) => {
  const { id } = req.params;

  try {
    const job = await Job.findById(id);

    if (!job) {
      res.status(404);
      return next(new Error("Job not found"));
    }

    // Check if the logged-in user is the owner of the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      res.status(401);
      return next(new Error("Not authorized to delete this job"));
    }

    await job.deleteOne();

    res.json({ message: "Job removed" });
  } catch (error) {
    console.error(error);
    res.status(500);
    return next(new Error("Server error"));
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
