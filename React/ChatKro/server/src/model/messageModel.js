import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    receiverId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    timestamp : {
        type:String,
        required:true
    }
},{timestamps:true})

const Message = mongoose.model("Message", messageSchema);

export default Message;
