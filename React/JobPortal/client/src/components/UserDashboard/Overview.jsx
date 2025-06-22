import React from 'react'

const Overview = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Total Applications</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Interviews Scheduled</h3>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold text-gray-600">Saved Jobs</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Applications</h3>
        <div className="bg-white rounded-lg shadow">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border-b last:border-b-0 p-4">
              <h4 className="font-semibold">Senior Frontend Developer</h4>
              <p className="text-gray-600 text-sm mt-1">Google Inc.</p>
              <p className="text-sm text-gray-500 mt-1">Applied on: 12 June 2023</p>
              <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                In Review
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Overview
