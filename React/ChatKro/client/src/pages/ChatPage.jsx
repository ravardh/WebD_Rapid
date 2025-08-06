import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import Chating from "../components/chating";
import AllUser from "../components/AllUser";

const ChatPage = () => {
  const { user, islogin } = useAuth();
  const navigate = useNavigate();
  const [chatUser, setChatUser] = useState("");
  const [selectedFriend, setSelectedFriend] = useState("");
  const [allUserModalOpen, setIsAllUserModalOpen] = useState(false);

  const fetchAllUser = async () => {
    try {
      const res = await api.get("/user/getAllUser");
      setChatUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !islogin && navigate("/login");
    fetchAllUser();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="min-w-3/12 border h-screen">
          <div className="flex flex-col h-full bg-base-100">
            <div className="p-3 border-b bg-base-200 flex gap-3 items-center justify-between ">
              <div className="flex gap-3 items-center">
                <img
                  src={user.profilePic}
                  alt="ProfilePic"
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    console.log(
                      "Main user image failed to load:",
                      user.profilePic
                    );
                    e.target.src = `https://placehold.co/600x400/?text=${user.fullName
                      .charAt(0)
                      .toUpperCase()}`;
                  }}
                />
                <div>
                  <button
                    className="text-2xl font-bold text-primary"
                    onClick={() => navigate("/profile")}
                  >
                    {user.fullName}
                  </button>
                  <h2 className="text-md text-base-content">Chats</h2>
                </div>
              </div>
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setIsAllUserModalOpen(true)}
              >
                New Chat
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Example chat list */}
              <div>Recent Chats</div>
              <ul>
                {chatUser &&
                  chatUser.map((friends, index) => (
                    <li
                      className="p-4 border-b hover:bg-base-300 cursor-pointer flex items-center"
                      key={index}
                      onClick={() => setSelectedFriend(friends._id)}
                    >
                      <img
                        src={friends.profilePic}
                        alt="profilePic"
                        className="w-8 h-8 rounded-full mr-3 object-cover"
                        onError={(e) => {
                          console.log(
                            "Image failed to load:",
                            friends.profilePic
                          );
                          e.target.src = `https://placehold.co/600x400/?text=${friends.fullName
                            .charAt(0)
                            .toUpperCase()}`;
                        }}
                        onLoad={() => {
                          console.log(
                            "Image loaded successfully:",
                            friends.profilePic
                          );
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-base-content">
                          {friends.fullName}
                        </span>
                        <span className="text-sm text-base-content">
                          @{friends.userName}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="min-w-9/12 border h-screen">
          <Chating selectedFriend={selectedFriend} />
        </div>
      </div>

      <AllUser
        isOpen={allUserModalOpen}
        onClose={() => setIsAllUserModalOpen(false)}
      />
    </>
  );
};

export default ChatPage;
