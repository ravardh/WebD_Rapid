import React from 'react'

const SavedJobs = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
      <div className="bg-white rounded-lg shadow">
        {[1, 2, 3].map((item) => (
          <div key={item} className="border-b last:border-b-0 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">UX Designer</h4>
                <p className="text-gray-600 text-sm mt-1">Apple Inc.</p>
                <p className="text-sm text-gray-500 mt-1">$80k - $120k/year</p>
              </div>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedJobs
