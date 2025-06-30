import React from 'react'

const Applications = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Applied Jobs</h2>
      <div className="bg-white rounded-lg shadow">
        {[1, 2, 3, 4,5,6,7,8,9,10].map((item) => (
          <div key={item} className="border-b last:border-b-0 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">Senior Frontend Developer</h4>
                <p className="text-gray-600 text-sm mt-1">Google Inc.</p>
                <p className="text-sm text-gray-500 mt-1">Applied on: 12 June 2023</p>
              </div>
              <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                In Review
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Applications
