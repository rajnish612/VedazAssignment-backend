import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password || !req.body) {
      return res.status(400).json({
        message: "username and password are required",
        success: false,
      });
    }
    const isUserExists = await User.findOne({
      username: username,
    });
    if (isUserExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const user = await User.create({
      username,
      password: await bcrypt.hash(password, 10),
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        username: user.username,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error, "register error");
    return res.status(400).json({ message: error.message, success: false });
  }
});
router.route("/login").post(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        username: user.username,
        id: user._id,
      },
      token,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Something went wrong ", success: false });
  }
});
export default router;
