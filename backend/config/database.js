// const mongoose = require("mongoose");
// require("dotenv").config();

import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Database connection function
const dbConnect = () => {
  try {
    console.log(process.env.MONGO_URI);

    const connection = mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(error);
  }
};

// Export the function
export default dbConnect;
