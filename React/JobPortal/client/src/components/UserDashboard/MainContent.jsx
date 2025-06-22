import React from 'react'
import Overview from './Overview'
import Profile from './Profile'
import Applications from './Applications'
import SavedJobs from './SavedJobs'

const MainContent = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />
      case 'profile':
        return <Profile />
      case 'applications':
        return <Applications />
      case 'saved':
        return <SavedJobs />
      default:
        return null
    }
  }

  return (
    <div className="w-4/5 h-full overflow-auto scrollbar-hide">
      {renderContent()}
    </div>
  )
}

export default MainContent
