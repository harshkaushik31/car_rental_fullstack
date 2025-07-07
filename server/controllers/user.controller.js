import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Car } from "../models/car.model.js";

// Generate JWT Token
const generateToken = (userId) => {
    const payload = userId
  return jwt.sign(payload, process.env.JWT_SECRET);
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Fill all fields and password must be at least 8 characters"
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    return res.status(200).json({
      success: true,
      token
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Get user Data using JWT Token
export const getUserData = async(req, res) =>{
    try {
        const {user} = req;
        return res.json({success: true, user}) 
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

// Get all cars for the frontend 
export const getCars = async(req, res) =>{
    try {
        const cars = await Car.find({isAvailable: true})
        return res.json({success: true, cars}) 
    } catch (error) {
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}