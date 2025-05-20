import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {type : mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiver: {type : mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type : String},
    image: {type : String},
    video: {type : String},
    audio: {type : String},
    file: {type : String},
    seen: {type : Boolean, default: false},
}, {timestamps: true})

const Message = mongoose.model("Message", MessageSchema);

export default Message;