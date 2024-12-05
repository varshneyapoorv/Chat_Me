import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
},{timestamps:true});

//Export the model
export const Message = mongoose.model('Message', messageModel);