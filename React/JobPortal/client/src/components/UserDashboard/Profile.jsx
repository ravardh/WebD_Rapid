import React from 'react'

const Profile = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-600">Frontend Developer</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold mb-2">Contact Information</h4>
            <p className="text-gray-600">Email: john@example.com</p>
            <p className="text-gray-600">Phone: +1 234 567 890</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Location</h4>
            <p className="text-gray-600">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
