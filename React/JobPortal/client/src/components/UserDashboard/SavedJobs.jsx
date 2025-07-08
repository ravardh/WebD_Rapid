import React, { useEffect, useState } from "react";
import axios from "../../config/api";
import toast from "react-hot-toast";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get("/user/allSavedJobs"); // Assuming this endpoint exists
      setJobs(res.data.data);
    } catch (error) {
      console.log(error.response);
      
      toast.error(
        `Error ${error?.response?.status || "503"} : ${
          error?.response?.data?.message || "Service Unavailable"
        }`
      );
    }
  };

  const handleApplyJob = async (applicationId, jobId) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // await axios.patch(`/user/applyToJob/${jobId}`);
      
      // For now, update the local state
      console.log("Job applied");
      
    } catch (error) {
      toast.error("Failed to apply to job");
    }
  };

  const handleUnsaveJob = async (applicationId) => {
    if (window.confirm("Are you sure you want to remove this job from saved?")) {
      try {
       console.log("Unsave Button Clicked");
       
      } catch (error) {
        toast.error("Failed to remove job from saved");
      }
    }
  };

  console.log(jobs);
  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "saved":
        return "bg-purple-100 text-purple-800";
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "interview":
        return "bg-yellow-100 text-yellow-800";
      case "offered":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "withdrawn":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>

      <div className="bg-white rounded-lg shadow">
        {jobs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No saved jobs found.</p>
          </div>
        ) : (
          jobs.map((application) => (
            <div key={application._id} className="border-b last:border-b-0 p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{application.jobId.jobTitle}</h4>
                  <p className="text-gray-600 text-sm mt-1">{application.jobId.company}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Location:</span> {application.jobId.jobLocation}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Salary:</span> {application.jobId.salaryRange}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Work Mode:</span> {application.jobId.workMode} • {application.jobId.jobType}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Saved on:</span> {formatDate(application.appliedOn)}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Recruiter:</span> {application.recruiterID.firstName} {application.recruiterID.lastName}
                  </p>
                </div>
                <div className="ml-4 flex flex-col items-end gap-5">
                  <span className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                  
                  <div className="flex flex-col gap-5">
                    {/* Apply Button - Only show for saved status */}
                    {application.status === "saved" && (
                      <button
                        onClick={() => handleApplyJob(application._id, application.jobId._id)}
                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                      >
                        Apply Now
                      </button>
                    )}
                    
                    {/* Unsave Button */}
                    <button
                      onClick={() => handleUnsaveJob(application._id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      {application.status === "saved" ? "Unsave" : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
