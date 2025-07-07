import React, { useState,useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import UserEditModal from "./Modals/UserEditModal";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("user")) || {}
  );

  useEffect(() => {
    setUserData(user);
  }, [user]);
  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold mb-6">My Profile</h2>
          <button
            className="border p-3 rounded hover:text-pink-500 flex gap-2 items-center"
            onClick={() => setEditModalOpen(true)}
          >
            <MdOutlineEdit className="text-xl" /> Edit Profile
          </button>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full">
              <img
                src={userData.photo || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold">
                {userData.firstName} {userData.lastName}
              </h3>
              <p className="text-gray-600">{userData.role}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <p className="text-gray-600">Email: {userData.email}</p>
              <p className="text-gray-600">Phone: {userData.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-gray-600">
                {userData.location || "San Francisco, CA"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <UserEditModal
        isOpen={isEditModalOpen}
        isClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default Profile;
