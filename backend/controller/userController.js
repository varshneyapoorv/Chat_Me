import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        // Check if all required fields are provided
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the username already exists
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists. Try another one." });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the profile photo URL based on the gender
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`; 
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`; 

        // Create the user in the database
        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender,
        });

        // Return success response
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);

        // Send error response to the client
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};
