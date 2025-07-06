import React, { useEffect, useState } from "react";
import ViewJobModal from "../components/Jobs/ViewJobModal";
import axios from "../config/api";
import { toast } from "react-hot-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [appliedJob, setAppliedJob] = useState(null);

  const fetchAllJobs = async () => {
    try {
      const res = await axios.get("/public/allJobs");
      setJobs(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleApply = (job) => {
    setAppliedJob(job);
    setModalOpen(false);
    alert(`Applied for: ${job.jobTitle} at ${job.company}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      <div className="grid gap-6">
        {jobs.length === 0 && <div>Loading jobs...</div>}
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{job.jobTitle}</h2>
              <p className="text-gray-600">
                {job.company} &middot; {job.jobLocation}
              </p>
              <p className="text-gray-500 text-sm">{job.salaryRange}</p>
              <p className="text-gray-500 text-sm">
                {job.jobType} &middot; {job.workMode}
              </p>
            </div>
            <button
              className="mt-4 md:mt-0 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleViewJob(job)}
            >
              View Job
            </button>
          </div>
        ))}
      </div>
      <ViewJobModal
        isOpen={isModalOpen}
        isClose={() => setModalOpen(false)}
        job={selectedJob}
        onApply={handleApply}
      />
    </div>
  );
};

export default Jobs;
