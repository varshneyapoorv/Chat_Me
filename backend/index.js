import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/database.js';  // Ensure the correct path to database.js
import userRoutes from './routes/userRoutes.js';  // Ensure the correct path to userRoutes.js

dotenv.config();  // Load environment variables from .env file
const app = express();

// Connect to the database
dbConnect();

// Middleware to parse JSON data in requests
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);  // Corrected path with leading '/'

// Starting the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
