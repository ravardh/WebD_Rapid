import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import api from "../config/api";
import { TbMessageHeart } from "react-icons/tb";
import apiSocket from "../config/socket";

const Chating = ({ selectedFriend }) => {
  const { user } = useAuth();
  const [currentFriend, setCurrentFriend] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState("");
  const messageEndRef = useRef(null);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const fetchCurrentUser = async () => {
    try {
      const res = await api.get(`user/getCurrentUser/${selectedFriend}`);
      setCurrentFriend(res.data.data);
    } catch (error) {}
  };
  const fetchMessages = async () => {
    try {
      const res = await api.get(`/user/receive/${selectedFriend}`);
      setChats(res.data.data);
    } catch (error) {
      setChats("");
    }
  };

  useEffect(() => {
    if (selectedFriend) {
      fetchCurrentUser();
      fetchMessages();
    }
  }, [selectedFriend]);

  const handleSendMessage = async () => {
    if (!message) return;

    try {
      const messagePack = {
        senderId: user._id,
        receiverId: selectedFriend,
        text: message,
        timestamp: new Date().toISOString(),
      };
      const res = await api.post("/user/send", messagePack);

      // console.log(res.data.message, res.data.text);
      // setMessage("");
      // receiveMessages();

      //Socket Code

      apiSocket.emit("send_Message", {
        from: user._id,
        to: selectedFriend,
        message: message,
        timestamp: messagePack.timestamp,
      });

      setChats((prev) => [...prev, { ...messagePack }]);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // const receiveMessages = async () => {
  //   try {
  //     const res = await api.get(`/user/receive/${selectedFriend}`);
  //     setChats(res.data.data);
  //   } catch (error) {
  //     setChats("");
  //   }
  // };

  useEffect(() => {
    if (!user._id || !selectedFriend) {
      return;
    }

    console.log(selectedFriend);

    apiSocket.emit("register", user._id);

    // Define the handler so we can remove it later
    const handleReceiveMessage = (msgPacket) => {
      if (msgPacket.from === selectedFriend) {
        setChats((prev) => [
          ...prev,
          {
            ...msgPacket,
            senderId: msgPacket.from,
            receiverId: msgPacket.to,
            text: msgPacket.message,
            timestamp: msgPacket.timestamp,
          },
        ]);
      }
    };

    apiSocket.on("receive_Message", handleReceiveMessage);

    return () => {
      apiSocket.off("receive_Message", handleReceiveMessage); // Remove the listener!
      apiSocket.emit("unregister", user._id);
    };
  }, [user._id, selectedFriend]);

  //Polling
  // useEffect(() => {
  //   if (selectedFriend) {
  //     const interval = setInterval(() => {
  //       receiveMessages();
  //     }, 2000); // Poll every 2 seconds

  //     // Cleanup interval on unmount or when selectedFriend changes
  //     return () => clearInterval(interval);
  //   }
  // }, [selectedFriend]); // Only re-run when selectedFriend changes
const formatToISTDateTime = (utcTimestamp) => {
  const options = {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formatted = new Date(utcTimestamp).toLocaleString("en-GB", options);

  return formatted.replace(",", ""); // Remove comma between date and time
}



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
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <div
                  className={`${
                    chat.senderId === user._id
                      ? "bg-secondary text-secondary-content self-end"
                      : "bg-primary text-primary-content self-start"
                  } p-2 rounded-lg max-w-[70%]`}
                  key={index}
                >
                  {chat.text}
                  <p className="text-xs opacity-50 flex justify-end">{formatToISTDateTime(chat.timestamp)}</p>
                </div>
              ))
            ) : (
              <div className="text-error p-3 rounded-lg h-full flex justify-center items-center">
                --No Messages--
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Message Input Area */}
          <div className="h-[10%] bg-base-200 border-t p-3 flex items-center gap-3 rounded-b-lg">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
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
