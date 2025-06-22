import React, { useState } from 'react'
import { FaUser, FaBriefcase, FaBookmark, FaChartBar, FaSignOutAlt } from 'react-icons/fa'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: FaChartBar },
    { id: 'profile', label: 'My Profile', icon: FaUser },
    { id: 'applications', label: 'Applied Jobs', icon: FaBriefcase },
    { id: 'saved', label: 'Saved Jobs', icon: FaBookmark },
  ]


 

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...')
  }

  return (
    <div className="w-1/5 h-full border-r bg-white overflow-y-auto scrollbar-hide flex flex-col">
      <div className="p-4 flex-grow">
        <h1 className="text-xl font-bold text-gray-800 mb-4"> Jhon's Dashboard</h1>
        <nav>
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-2 mt-2 text-sm rounded-lg ${
                activeTab === item.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm rounded-lg text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
