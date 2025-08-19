import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false });
    }
    const token = authHeader?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ message: "No token provided", success: false });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token or expired token", success: false });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err, "verify token error");

    return res
      .status(500)
      .json({ message: "invalid token or token expired", success: false });
  }
};
export default verifyToken;
