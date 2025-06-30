import React, { useState } from "react";
import Sidebar from "../../components/RecruiterDashboard/Sidebar";
import Overview from "../../components/RecruiterDashboard/Overview";
import Profile from "../../components/RecruiterDashboard/Profile";
import Applications from "../../components/RecruiterDashboard/Applications";
import PostJobs from "../../components/RecruiterDashboard/PostJobs";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-100 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-4/5 h-full overflow-auto scrollbar-hide">
        {activeTab === "overview" && <Overview />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "application" && <Applications />}
        {activeTab === "addJobs" && <PostJobs />}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
