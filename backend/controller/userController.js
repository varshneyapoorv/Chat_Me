import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



//register the user in the db
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


//login controller
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if all required fields are provided
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ 
                message: "Invalid credentials",
                success: false,});
        }

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create the JWT token
        const tokenData = {
            userId : user._id,
        };

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, {maxAge : 1*24*60*60*1000, httpOnly : true, sameSite : 'strict'}).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            profilePhoto: user.profilePhoto
        });

        // Return success response
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
        });


    } catch (error) {
        console.error(error);

        // Send error response to the client
        return res.status(500).json({ message: error.message });
    }

}


// logout controller
export const logout = async (req, res) => {
    try {
        // // Clear the cookie
        // res.clearCookie("token");

        // // Return success response
        // return res.status(200).json({
        //     message: "User logged out successfully",
        //     success: true,
        // });

        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "User logged out successfully",
            success: true,
        })

    } catch (error) {
        console.error(error);

        // Send error response to the client
        return res.status(500).json({ message: error.message });
    }
}

// other user controllers will go here
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        
    }
}
