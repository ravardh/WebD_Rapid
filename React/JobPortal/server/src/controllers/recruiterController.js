import Job from "../models/jobModel.js";

export const addJob = async (req, res, next) => {
  try {
    const {
      applicationDeadline,
      numberOfOpenings,
      workMode,
      jobType,
      jobLocation,
      experienceRequired,
      preferedQualification,
      description,
      salaryRange,
      company,
      jobTitle,
    } = req.body;

    if (
      !applicationDeadline ||
      !numberOfOpenings ||
      !workMode ||
      !jobType ||
      !jobLocation ||
      !experienceRequired ||
      !preferedQualification ||
      !description ||
      !salaryRange ||
      !company ||
      !jobTitle
    ) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const newJob = await Job.create({
      userid: req.user._id,
      applicationDeadline,
      numberOfOpenings,
      workMode,
      jobType,
      jobLocation,
      experienceRequired,
      preferedQualification,
      description,
      salaryRange,
      company,
      jobTitle,
    });

    // console.log("Job Posted", newJob);

    res.status(201).json({ message: "Job Posted Sucessfully" });
  } catch (error) {
    next(error);
  }
};

export const viewAllJob = async (req, res, next) => {
  try {
    const postedJobs = (await Job.find({ userid: req.user._id })) || [];

    res.status(200).json({ data: postedJobs });
  } catch (error) {
    next(error);
  }
};

export const editJob = async (req, res, next) => {
  try {
    const jobID = req.params.id;
    const {
      applicationDeadline,
      numberOfOpenings,
      workMode,
      jobType,
      jobLocation,
      experienceRequired,
      preferedQualification,
      description,
      salaryRange,
      company,
      jobTitle,
    } = req.body;

    const job = await Job.findById(jobID);

    if (!job) {
      const error = new Error("Job Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobID,
      {
        applicationDeadline,
        numberOfOpenings,
        workMode,
        jobType,
        jobLocation,
        experienceRequired,
        preferedQualification,
        description,
        salaryRange,
        company,
        jobTitle,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    if (!job) {
      const error = new Error("Job Not Found");
      error.statusCode = 404;
      return next(error);
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job Removed Succesfully" });
  } catch (error) {
    next(error);
  }
};
