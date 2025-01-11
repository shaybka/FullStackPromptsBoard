import cloudinary from "../config/cloudinary.js";
import { JWT_SECRET } from "../config/config.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// 1. **Register User (`registerUser`)**
//    - Validate input fields.
//    - Check for existing user by username or email.
//    - Create and save new user.
//    - Generate JWT token.
//    - Return response without password.

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const avatarFile = req.file;

  // Input validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    let avatarUrl = "";
    if (avatarFile) {
      // Encode image buffer to base64
      const encodedImage = `data:${
        avatarFile.mimetype
      };base64,${avatarFile.buffer.toString("base64")}`;

      // Upload the encoded image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(encodedImage, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      avatarUrl = uploadResponse.secure_url;
    }

    // Create new user
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      avatar: avatarUrl,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
      },
      token,
      expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// 2. **Login User (`loginUser`)**
//    - Validate input fields.
//    - Find user by email.
//    - Compare passwords.
//    - Generate JWT token.
//    - Set HTTP-only cookie.
//    - Return user data and token.
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const userInfo = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await userInfo.matchPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const expiresIn = 7 * 24 * 60 * 60; // 7 days in seconds
    const token = jwt.sign({ _id: userInfo._id }, JWT_SECRET, { expiresIn });

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: expiresIn * 1000, // Convert to milliseconds
    });

    // Prepare user data for response
    const userResponse = {
      _id: userInfo._id,
      email: userInfo.email,
      username: userInfo.username,
      avatar: userInfo.avatar,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token,
      expiresIn,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({
        message: `Something went wrong, please try again: ${error.message}`,
      });
  }
};
