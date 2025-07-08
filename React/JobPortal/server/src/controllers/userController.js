import Job from "../models/jobModel.js";
import User from "../models/userModel.js";
import AppliedJob from "../models/appliedJobs.js";

export const JobApply = async (req, res, next) => {
  try {
    const JobId = req.params.id;
    const UserId = req.user._id;

    const JobDetails = await Job.findById(JobId);

    if (!JobDetails) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }

    const RecruiterID = JobDetails.userid;

    const recruiterDetails = await User.findById(RecruiterID);

    if (!recruiterDetails) {
      const error = new Error("Recruiter Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const alreadyApplied = await AppliedJob.findOne({
      jobId: JobId,
      userId: UserId,
    });

    if (alreadyApplied) {
      // Check if the user has already applied for this job
      const error = new Error("You have already applied for this job");
      error.statusCode = 409;
      return next(error);
    }

    const appliedJob = {
      jobId: JobId,
      userId: UserId,
      recruiterID: RecruiterID,
    };

    const appliedJobDetails = await AppliedJob.create(appliedJob);
    res.status(200).json({
      message: "Job Applied Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const JobSave = async (req, res, next) => {
  try {
    const JobId = req.params.id;
    const UserId = req.user._id;

    const JobDetails = await Job.findById(JobId);

    if (!JobDetails) {
      const error = new Error("Job not found");
      error.statusCode = 404;
      return next(error);
    }

    const RecruiterID = JobDetails.userid;

    const recruiterDetails = await User.findById(RecruiterID);

    if (!recruiterDetails) {
      const error = new Error("Recruiter Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const alreadyApplied = await AppliedJob.findOne({
      jobId: JobId,
      userId: UserId,
    });

    if (alreadyApplied) {
      // Check if the user has already applied for this job
      const error = new Error("You have Already Applied or Saved this Job");
      error.statusCode = 409;
      return next(error);
    }

    const appliedJob = {
      jobId: JobId,
      userId: UserId,
      recruiterID: RecruiterID,
      status: "saved", // Set the status to 'saved'
    };

    const appliedJobDetails = await AppliedJob.create(appliedJob);
    res.status(200).json({
      message: "Job Saved Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const AllAppliedJobs = async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log("fetching applied jobs");

    const appliedJobs = await AppliedJob.find({
      userId,
      status: { $ne: "saved" }, //$ne means Not Equal to
    })
      .populate("jobId")
      .populate("recruiterID");

    if (!appliedJobs || appliedJobs.length === 0) {
      const error = new Error("No applied jobs found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message: "All Applied Jobs Fetched",
      data: appliedJobs,
    });
  } catch (error) {
    next(error);
  }
};

export const AllSavedJobs = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const savedJobs = await AppliedJob.find({
      userId,
      status: "saved",
    })
      .populate("jobId")
      .populate("recruiterID");

    if (!savedJobs || savedJobs.length === 0) {
      const error = new Error("No saved jobs found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      message: "All Saved Jobs Fetched",
      data: savedJobs,
    });
  } catch (error) {
    next(error);
  }
};
