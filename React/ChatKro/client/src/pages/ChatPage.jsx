import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

const ChatPage = () => {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Alice",
      content: "Hey! How are you?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false
    },
    {
      id: 2,
      sender: "You",
      content: "I'm doing great! Thanks for asking. How about you?",
      timestamp: new Date(Date.now() - 3300000),
      isOwn: true
    },
    {
      id: 3,
      sender: "Alice",
      content: "I'm good too! Just working on some new projects. What have you been up to?",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false
    },
    {
      id: 4,
      sender: "You",
      content: "Same here! Building some cool stuff with React and FlyonUI. The themes are amazing!",
      timestamp: new Date(Date.now() - 2700000),
      isOwn: true
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("Alice");
  const messagesEndRef = useRef(null);

  const users = [
    { id: 1, name: "Alice", status: "online", avatar: "A", lastSeen: "now" },
    { id: 2, name: "Bob", status: "away", avatar: "B", lastSeen: "5 min ago" },
    { id: 3, name: "Charlie", status: "offline", avatar: "C", lastSeen: "2 hours ago" },
    { id: 4, name: "Diana", status: "online", avatar: "D", lastSeen: "now" },
    { id: 5, name: "Eve", status: "away", avatar: "E", lastSeen: "15 min ago" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date(),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage("");

      // Simulate a response after 2 seconds
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: selectedUser,
          content: "That sounds awesome! I'd love to hear more about it.",
          timestamp: new Date(),
          isOwn: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'badge-success';
      case 'away': return 'badge-warning';
      case 'offline': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex">
      {/* Sidebar - Users List */}
      <div className="w-80 bg-base-200 border-r border-base-300">
        {/* Header */}
        <div className="p-4 border-b border-base-300">
          <h2 className="text-xl font-bold font-sans">Chats</h2>
          <p className="text-sm text-base-content/70 font-sans">Theme: {theme}</p>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search conversations..."
              className="input input-bordered w-full font-sans"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className={`p-4 cursor-pointer hover:bg-base-300 border-b border-base-300 ${
                selectedUser === user.name ? 'bg-primary/10' : ''
              }`}
              onClick={() => setSelectedUser(user.name)}
            >
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <span className="font-bold font-sans">{user.avatar}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold font-sans">{user.name}</h3>
                    <div className={`badge badge-xs ${getStatusColor(user.status)}`}></div>
                  </div>
                  <p className="text-xs text-base-content/70 font-sans">{user.lastSeen}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-base-200 border-b border-base-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-secondary text-secondary-content flex items-center justify-center">
                  <span className="font-bold font-sans">{selectedUser[0]}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold font-sans">{selectedUser}</h3>
                <p className="text-xs text-base-content/70 font-sans">Online</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-sm">
                📞
              </button>
              <button className="btn btn-ghost btn-sm">
                📹
              </button>
              <button className="btn btn-ghost btn-sm">
                ℹ️
              </button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${message.isOwn ? 'chat-end' : 'chat-start'}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                  <span className="text-sm font-sans">{message.sender[0]}</span>
                </div>
              </div>
              <div className="chat-header font-sans">
                {message.sender}
                <time className="text-xs opacity-50 ml-2">{formatTime(message.timestamp)}</time>
              </div>
              <div className={`chat-bubble font-sans ${
                message.isOwn ? 'chat-bubble-primary' : 'chat-bubble-secondary'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-base-200 border-t border-base-300">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <button type="button" className="btn btn-ghost btn-sm">
              📎
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input input-bordered flex-1 font-sans"
            />
            <button type="button" className="btn btn-ghost btn-sm">
              😊
            </button>
            <button
              type="submit"
              className="btn btn-primary font-sans"
              disabled={!newMessage.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
