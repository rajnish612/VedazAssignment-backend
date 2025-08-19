import express from "express";
import verifyToken from "../middlewares/Verify.js";
import Message from "../models/Messages.js";
const router = express.Router();

router.route("/:id/messages").get(verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const messages = await Message.find({
      $or: [
        { sender: id, receiver: req.user._id },
        { sender: req.user._id, receiver: id },
      ],
    }).populate("sender receiver", "-password");

    if (!messages) {
      return res
        .status(404)
        .json({ message: "Messages not found", success: false });
    }

    return res.status(200).json({ messages, success: true });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});
router.route("/messages/send").post(verifyToken, async (req, res) => {
  if (!req.user)
    return res.status(404).json({ message: "User not found", success: false });
  const { receiver, content } = req.body;
  try {
    const messages = await Message.create({
      sender: req.user._id,
      receiver,
      content,
    });
    const populatedMessage = await Message.findById(messages._id).populate(
      "sender receiver",
      "-password"
    );
    if (!populatedMessage) {
      return res
        .status(404)
        .json({ message: "failed to create messages", success: false });
    }

    return res.status(200).json({ messages: populatedMessage, success: true });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
});
export default router;
