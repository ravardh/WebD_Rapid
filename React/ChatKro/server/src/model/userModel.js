import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  googleID: {
    type: String,
  },
  type:{
    type:String,
    enum:["googleUser","normalUser"]
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Suspended"],
    default: "Active",
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User;
