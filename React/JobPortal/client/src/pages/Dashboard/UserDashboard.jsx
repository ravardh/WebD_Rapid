import React, { useState, useEffect } from "react";
import Sidebar from "../../components/UserDashboard/Sidebar";
import Overview from "../../components/UserDashboard/Overview";
import Profile from "../../components/UserDashboard/Profile";
import SavedJobs from "../../components/UserDashboard/SavedJobs";
import Applications from "../../components/UserDashboard/Applications";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();

  const { isLogin, isUser } = useAuth();
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else if (!isUser) {
      navigate("/notfound");
    }
  }, [isLogin, isUser, navigate]);

  return (
    <>
      {(isLogin && isUser) && (
        <div className="flex h-[calc(100vh-100px)] bg-gray-100 overflow-hidden">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="w-4/5 h-full overflow-auto scrollbar-hide">
            {activeTab === "overview" && <Overview />}
            {activeTab === "profile" && <Profile />}
            {activeTab === "applications" && <Applications />}
            {activeTab === "saved" && <SavedJobs />}
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
