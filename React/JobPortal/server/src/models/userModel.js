import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["Admin", "User", "Recruiter"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export default User;
