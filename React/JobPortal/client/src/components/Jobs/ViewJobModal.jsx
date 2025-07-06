import React from "react";
import { SlClose } from "react-icons/sl";

const ViewJobModal = ({ isOpen, isClose, job, onApply }) => {
  if (!isOpen || !job) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 relative">
        <button className="absolute top-4 right-4" onClick={isClose}>
          <SlClose className="text-2xl text-red-500 hover:text-red-700" />
        </button>
        <h2 className="text-2xl font-bold mb-2">{job.jobTitle}</h2>
        <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
        <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.jobLocation}</p>
        <p className="text-gray-700 mb-1"><strong>Salary:</strong> {job.salaryRange}</p>
        <p className="text-gray-700 mb-1"><strong>Type:</strong> {job.jobType}</p>
        <p className="text-gray-700 mb-1"><strong>Work Mode:</strong> {job.workMode}</p>
        <p className="text-gray-700 mb-1"><strong>Openings:</strong> {job.numberOfOpenings}</p>
        <p className="text-gray-700 mb-1"><strong>Experience:</strong> {job.experienceRequired}</p>
        <p className="text-gray-700 mb-1"><strong>Qualification:</strong> {job.preferedQualification}</p>
        <p className="text-gray-700 mb-1"><strong>Posted On:</strong> {new Date(job.postedDate).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-1"><strong>Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
        <p className="text-gray-700 mt-4 mb-2"><strong>Description:</strong></p>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => onApply(job)}
        >
          Apply for this Job
        </button>
      </div>
    </div>
  );
};

export default ViewJobModal;
