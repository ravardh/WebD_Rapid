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
