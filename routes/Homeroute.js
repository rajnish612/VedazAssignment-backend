import express from "express";
import verifyToken from "../middlewares/Verify.js";
import User from "../models/User.js";

const router = express.Router();
router.route("/user").get(verifyToken, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});
router.route("/users").get(verifyToken, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const users = await User.find({ _id: { $ne: user.id } }).select(
      "-password"
    );

    return res.status(200).json({ users, success: true });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});
router.route("/conversations/:id/messages");
export default router;
