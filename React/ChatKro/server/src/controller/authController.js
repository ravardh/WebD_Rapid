import { hash } from "bcrypt";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.js";

export const Register = async (req, res, next) => {
  try {
    const { userName, fullName, email, password } = req.body;

    if (!userName || !fullName || !email || !password) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePicUrl = `https://placeholder.com/600x400?text=${fullName
      .charAt(0)
      .toUpperCase()}`;

    const newUser = new User({
      userName,
      fullName,
      email,
      password: hashedPassword,
      profilePic: profilePicUrl,
      type: "normalUser",
      status: "Active",
      role: "User",
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.statusCode = 401;
      return next(error);
    }

    await generateToken(user._id, res);

    res.json({ message: "User logged in successfully", user });
  } catch (error) {
    next(error);
  }
};

export const Logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const Update = async (req, res, next) => {
  res.status(200).json({ message: "User Update Done" });
};

export const Delete = async (req, res, next) => {
  res.status(200).json({ message: "User Delete Done" });
};

export const googleLogin = async (req, res, next) => {
  try {
    const { id, email, imageUrl, name } = req.body;
    const existingUser = await User.findOne({ email });
    console.log("Existing User:", existingUser);
    console.log({ id, email, imageUrl, name });
    if (!existingUser) {
      console.log("Creating new user for Google login");

      const profilePicUrl = imageUrl.split("=s96")[0] + "=s400-c";
      const hashGoogleID = await bcrypt.hash(id, 10);
      const user_Name = email.split("@")[0];

      console.log("ProfilePicURL", profilePicUrl);
      console.log("HashedGoogelId", hashGoogleID);
      console.log("userName", user_Name);

      let newUser;

      try {
        newUser = await User.create({
          userName: user_Name,
          fullName: name,
          email,
          googleID: hashGoogleID,
          profilePic: profilePicUrl,
          type: "googleUser",
          status: "Active",
          role: "User",
        });
      } catch (error) {
        console.log("Error Creating the New user", error);
        next(error);
      }

      await generateToken(newUser._id, res);
      res.json({ message: "User logged in successfully", newUser });
    } else if (existingUser.type === "normalUser") {
      console.log("Upgrading existing user to Google user");

      const hashGoogleID = await bcrypt.hash(id, 10);
      const upgradeUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          type: "googleUser",
          googleID: hashGoogleID,
        },
        { new: true }
      );

      await generateToken(upgradeUser._id, res);

      res.json({ message: "User logged in successfully", upgradeUser });
    } else {
      console.log("User already exists with Google login");

      const isMatch = await bcrypt.compare(id, existingUser.googleID);

      if (!isMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        return next(error);
      }

      await generateToken(existingUser._id, res);

      res.json({ message: "User logged in successfully", existingUser });
    }
  } catch (error) {
    next(error);
  }
};
