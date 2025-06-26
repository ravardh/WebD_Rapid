import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import UserEditModal from "./Modals/UserEditModal";

const Profile = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

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

      <UserEditModal
        isOpen={isEditModalOpen}
        isClose={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default Profile;
