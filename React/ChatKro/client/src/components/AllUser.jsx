import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import api from "../config/api";
import toast from "react-hot-toast";

const TABS = ["All Contacts", "Friend Requests"];

const AllUser = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // For demo, replace with your API endpoint
  const USERS_API = "/user/getAllUser";
  const REQUESTS_API = "/user/friendRequests";

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    setError("");
    if (activeTab === 0) {
      api
        .get(USERS_API)
        .then((res) => setUsers(res.data.data))
        .catch((error) => {
          setError("Failed to fetch users.");
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      api
        .get(REQUESTS_API)
        .then((res) => setRequests(res.data.data))
        .catch(() => setError("Failed to fetch requests."))
        .finally(() => setLoading(false));
    }
  }, [isOpen, activeTab]);

  const handleAddFriend = async (userId) => {
    try {
      console.log(userId);

      const res = await api.post(`user/addFriend/${userId}`);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Request failed");
    }
  };

  if (!isOpen) return null;

  console.log(requests);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-base-100/80 rounded-2xl min-h-[70vh] shadow-2xl w-full max-w-xl p-0 relative animate-fadeIn mt-5 border border-base-200 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 py-4 border-b-2 mb-2 rounded-t-2xl bg-base-100/90">
          <h1 className="text-xl font-extrabold tracking-tight text-primary drop-shadow">Increase your Friend Circle</h1>
          <button
            className="text-2xl text-base-content hover:text-error transition-colors duration-200"
            onClick={onClose}
            title="Close"
          >
            <IoMdCloseCircle />
          </button>
        </div>
        <div className="flex border-b mb-4 px-6">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 font-semibold focus:outline-none transition-colors duration-200 ${
                activeTab === idx
                  ? "border-b-2 border-primary text-primary"
                  : "text-base-content/70 hover:text-primary"
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {tab}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="text-center py-12 text-lg font-semibold text-primary animate-pulse">Loading...</div>
        ) : error ? (
          <div className="text-center text-error py-12 text-lg font-semibold">{error}</div>
        ) : (
          <div className="max-h-[55vh] overflow-y-auto px-2 pb-4">
            {activeTab === 0 ? (
              users.length === 0 ? (
                <div className="text-center text-base-content/60">
                  No users found.
                </div>
              ) : (
                <ul>
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-base-200 last:border-b-0 px-2 hover:bg-base-200/40 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={user.profilePic}
                          alt="ProfilePic"
                          className="h-12 w-12 rounded-full object-cover border-2 border-primary/30 shadow-sm bg-base-200"
                          onError={(e) => {
                            e.target.src = `https://placehold.co/600x400/?text=${user.fullName
                              .charAt(0)
                              .toUpperCase()}`;
                          }}
                        />
                        <span className="font-semibold text-base-content text-lg">{user.fullName}</span>
                      </div>
                      <button
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-warning text-white font-semibold shadow hover:scale-105 active:scale-95 transition-transform duration-150 text-sm"
                        onClick={() => handleAddFriend(user._id)}
                      >
                        Add Friend
                      </button>
                    </li>
                  ))}
                </ul>
              )
            ) : requests.length === 0 ? (
              <div className="text-center text-base-content/60">
                No Friend Requests.
              </div>
            ) : (
              <ul>
                {requests.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-base-200 last:border-b-0 px-2 hover:bg-base-200/40 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={req.user2.profilePic}
                        alt="ProfilePic"
                        className="h-12 w-12 rounded-full object-cover border-2 border-secondary/30 shadow-sm bg-base-200"
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x400/?text=${req.user2.fullName
                            .charAt(0)
                            .toUpperCase()}`;
                        }}
                      />
                      <span className="font-semibold text-base-content text-lg">{req.user2.fullName}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-md bg-green-500/90 text-white text-xs font-semibold shadow hover:bg-green-600/90 active:scale-95 transition-all">Approve</button>
                      <span className="w-0.5 h-5 bg-base-300 rounded-full self-center"></span>
                      <button className="px-3 py-1 rounded-md bg-red-500/90 text-white text-xs font-semibold shadow hover:bg-red-600/90 active:scale-95 transition-all">Reject</button>
                      <span className="w-0.5 h-5 bg-base-300 rounded-full self-center"></span>
                      <button className="px-3 py-1 rounded-md bg-gray-400/80 text-white text-xs font-semibold shadow hover:bg-gray-500/90 active:scale-95 transition-all">Block</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
