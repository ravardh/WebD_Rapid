import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // console.log(token);

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const verifiedUser = await User.findById(decode.id);

    // console.log(verifiedUser);

    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};
