import mongoose from "mongoose";

// Declare the Schema of the Mongo model
const userModel = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    
    password:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum : ["male", "female"],
        required:true,
    },
},{timestamps:true});

//Export the model
export const User = mongoose.model('User', userModel);