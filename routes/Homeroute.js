import express from "express";
import verifyToken from "../middlewares/Verify.js";

const router = express.Router();

router.route("/users").get(verifyToken, (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(404).json({ message: "User not found", success: false });
  }
});
export default router;
