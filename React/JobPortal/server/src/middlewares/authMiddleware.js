import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const Protect = async (req, res, next) => {
  try {
    const token = req.cookies.secret;
    if (!token) {
      const error = new Error("Not authorized, no token");
      error.statusCode = 401;
      return next(error);
    }

   // console.log("token ", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      const error = new Error("User not found");
      error.statusCode = 401;
      return next(error);
    }
  //  console.log("Current User:", currentUser);
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

export const isRecruiter = (req, res, next) => {
  try {
    console.log(req.user.role);
    if (!req.user.role === "Recruiter") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }
   // console.log("Recruiter Confirmed");
    next();
  } catch (error) {
    next(error);
  }
};

export const isUser = (req, res, next) => {
  try {
    if (!req.user.role === "Recruiter") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (!req.user.role === "Recruiter") {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};
