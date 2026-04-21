import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create an instance(user) of User (Mongoose runs Schema Validators here)
    const user = new User({ name, email, password });

    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    // Handle Mongoose Validation Errors specifically
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages[0] });
    }

    console.error("Registration Error:", err);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Manually .select('+password') because I set it to false in the Schema
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email " });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = await user.genToken();

    const options = {
      // Ensure process.env.COOKIE_EXPIRATION is converted to a number
      expires: new Date(
        Date.now() + (Number(process.env.COOKIE_EXPIRATION) || 86400000),
      ),
      httpOnly: true,
      secure: process.env.NODE_ENV?.toLowerCase() === "production",
      sameSite: "strict",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({
        message: "Login successful",
        user: { name: user.name, email: user.email },
        token,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    // Since middleware already populated req.user, we just use it.
    const { name, email, _id } = req.user;

    res.status(200).json({
      success: true,
      user: {
        id: _id,
        name,
        email,
      },
    });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Update fields only if they are provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
      user.password = password; // This triggers .isModified('password')
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    // Handle Mongoose Validation Errors (like if the new email is invalid)
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages[0] });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = (req, res) => {
  try {
    // We overwrite the 'token' cookie with null and set it to expire now
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()), // Expires immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Successfully logged out",
      });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to log out",
    });
  }
};
