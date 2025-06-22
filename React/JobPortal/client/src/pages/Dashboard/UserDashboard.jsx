import React, { useState } from 'react'
import Sidebar from '../../components/UserDashboard/Sidebar'
import MainContent from '../../components/UserDashboard/MainContent'

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
    </div>
  )
}

export default UserDashboard
