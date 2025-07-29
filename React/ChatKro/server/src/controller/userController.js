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
    const { senderId, receiverId, message } = req.body;
    //console.log({ senderId, receiverId, message });

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: message,
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
