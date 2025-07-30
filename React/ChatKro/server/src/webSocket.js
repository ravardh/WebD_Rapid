const OnlineUsers = {};

export const webSocket = (io) => {
  io.on("connection", (socket) => {
    socket.on("register", (userID) => {
      OnlineUsers[userID] = socket.id;
      console.log("OnlineUsers", OnlineUsers);
    });

    socket.on("unregister", (userID) => {
      delete OnlineUsers[userID];
      console.log("OnlineUsers", OnlineUsers);
    });
  });
};
