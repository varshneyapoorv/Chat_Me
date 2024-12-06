import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/database.js'; 
import userRoutes from './routes/userRoutes.js';  
import messageRoutes from './routes/messageRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();  // Load environment variables from .env file
const app = express();

// Connect to the database
dbConnect();

// Middleware to parse JSON data in requests
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoutes); 
app.use("/api/v1/message", messageRoutes);


// Starting the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
