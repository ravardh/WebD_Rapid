import mongoose from "mongoose";

const FriendListSchema = mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",  
    },
    status: {
      type: String,
      enum: ["requested", "accepted", "rejected", "blocked"],
    },
  },
  { timestamps: true }
);

const FriendList = mongoose.model("FrientList", FriendListSchema);

export default FriendList;
