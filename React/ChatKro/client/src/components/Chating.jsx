import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../config/api";
import { TbMessageHeart } from "react-icons/tb";

const dummySender = "64e8c0a5f01c6a1234567890";
const dummyReceiver = "64e8c0a5f01c6a0987654321";
const chats = [
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Hey!",
    timestamp: "2025-07-28T12:01:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Hi! What's up?",
    timestamp: "2025-07-28T12:02:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Just working on a new project.",
    timestamp: "2025-07-28T12:03:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Oh nice, what kind?",
    timestamp: "2025-07-28T12:04:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "A chat app with MERN stack.",
    timestamp: "2025-07-28T12:05:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Sounds cool!",
    timestamp: "2025-07-28T12:06:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Thanks 😄",
    timestamp: "2025-07-28T12:07:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Need any help?",
    timestamp: "2025-07-28T12:08:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Maybe with real-time features.",
    timestamp: "2025-07-28T12:09:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Sure! I’ve done that with Socket.io.",
    timestamp: "2025-07-28T12:10:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Perfect! I’ll ping you soon.",
    timestamp: "2025-07-28T12:11:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Looking forward to it!",
    timestamp: "2025-07-28T12:12:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Do you have any reusable components?",
    timestamp: "2025-07-28T12:13:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Yes, will share the repo.",
    timestamp: "2025-07-28T12:14:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Awesome, thanks!",
    timestamp: "2025-07-28T12:15:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "No problem at all.",
    timestamp: "2025-07-28T12:16:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Let’s deploy it soon.",
    timestamp: "2025-07-28T12:17:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Yeah, use Render or Vercel?",
    timestamp: "2025-07-28T12:18:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Let’s try Vercel first.",
    timestamp: "2025-07-28T12:19:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Alright. Let’s push code tonight.",
    timestamp: "2025-07-28T12:20:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "Sure, catch you later!",
    timestamp: "2025-07-28T12:21:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a0987654321",
    receiverId: "64e8c0a5f01c6a1234567890",
    text: "Bye 👋",
    timestamp: "2025-07-28T12:22:00Z",
  },
  {
    senderId: "64e8c0a5f01c6a1234567890",
    receiverId: "64e8c0a5f01c6a0987654321",
    text: "👋",
    timestamp: "2025-07-28T12:23:00Z",
  },
];

const Chating = ({ selectedFriend }) => {
  const { user } = useAuth();
  const [currentFriend, setCurrentFriend] = useState("");
  const [message, setMessage] = useState("");

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get(`user/getCurrentUser/${selectedFriend}`);
      setCurrentFriend(res.data.data);
    } catch (error) {}
  };
  const fetchMessages = () => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedFriend) {
      fetchCurrentUser();
      fetchMessages();
    }
  }, [selectedFriend]); // Add selectedFriend as dependency

  const handleSendMessage = () => {
    console.log("Sending Message", message);
  };

  if (!selectedFriend) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-[60vh] text-base-content">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Chat Karo!</h2>
          <p className="mb-4">Select a friend to start chatting.</p>
          <TbMessageHeart className="text-9xl" />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-base-200 p-3 flex border-b-2">
        <img
          src={currentFriend.profilePic}
          alt="profilePic"
          className="w-12 h-12 rounded-full mr-3 object-cover"
          onError={(e) => {
            console.log("Image failed to load:", currentFriend.profilePic);
            e.target.src = `https://placehold.co/600x400/?text=${currentFriend.fullName
              .charAt(0)
              .toUpperCase()}`;
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", currentFriend.profilePic);
          }}
        />
        <div className="flex flex-col">
          <span className="text-2xl text-base-content">
            {currentFriend.fullName}
          </span>
          <span className="text-md text-base-content">
            @{currentFriend.userName}
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="border rounded-lg h-[87vh] flex flex-col bg-base-100 shadow">
          {/* Chat Messages */}
          <div className="h-[90%] overflow-y-auto p-4 space-y-3 text-base-content flex flex-col">
            {/* Example Messages */}
            {chats.map((chat, index) => (
              <div
                className={`${
                  chat.senderId === dummySender
                    ? "bg-secondary text-secondary-content self-end"
                    : "bg-primary text-primary-content self-start"
                } p-3 rounded-lg max-w-[70%]`}
                key={index}
              >
                {chat.text}
              </div>
            ))}
          </div>

          {/* Message Input Area */}
          <div className="h-[10%] bg-base-200 border-t p-3 flex items-center gap-3 rounded-b-lg">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered flex-1"
            />
            <button onClick={handleSendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chating;
