import FriendList from "../model/friendModel.js";
import Message from "../model/messageModel.js";
import User from "../model/userModel.js";

export const GetAllUser = async (req, res, next) => {
  try {
    console.log("getting all user");

    const user = req.user;
    const users = (await User.find({ _id: { $ne: user._id } })) || "";
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

export const CurrentUser = async (req, res, next) => {
  try {
    console.log("getting current user");
    const receiverId = req.params.id;
    const sender = req.user;
    const Reciver = await User.findById(receiverId);
    res.status(200).json({ data: Reciver });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { senderId, receiverId, text, timestamp } = req.body;
    //console.log({ senderId, receiverId, text,timeStamp });

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      timestamp: timestamp,
    });

    res
      .status(201)
      .json({ message: "Message Sent Sucessfully", text: newMessage.text });
  } catch (error) {
    next(error);
  }
};

export const receiveMessage = async (req, res, next) => {
  try {
    const receiver = req.params.id;
    const sender = req.user._id;

    const chats = await Message.find({
      $or: [
        { senderId: sender, receiverId: receiver },
        { senderId: receiver, receiverId: sender },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json({ message: "All Message Fetched", data: chats });
  } catch (error) {
    next(error);
  }
};

export const AddFriend = async (req, res, next) => {
  try {
    const user1 = req.user._id;
    const user2 = req.params.id;

    await FriendList.create({
      user1,
      user2,
      status: "requested",
    });

    res.status(200).json({ message: "Friend Request Sent" });
  } catch (error) {
    next(error);
  }
};

export const FriendRequests = async (req, res, next) => {
  try {
    const userID = req.user._id;

    const requests =
      (await FriendList.find({
        user2: userID,
        status: "requested",
      }).populate("user2")) || [];
    res
      .status(200)
      .json({ message: "Friend Requests Fetched", data: requests });
  } catch (error) {
    next(error);
  }
};
