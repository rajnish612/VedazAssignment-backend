import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import authRoutes from "./routes/Authroute.js";
import http from "http";
import connectDB from "./lib/Connection.js";
import Homerouter from "./routes/Homeroute.js";
import MessageRoute from "./routes/Messages.js";
import VerifyKey from "./middlewares/VerifyKey.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
const io = new Server(httpServer);
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(VerifyKey);
app.use("/auth", authRoutes);
app.use("/", Homerouter);
app.use("/conversation", MessageRoute);
io.on("connection", (socket) => {
  socket.on("join", ({ userId }) => {
    socket.join(userId);
  });
  socket.on("message", ({ sender, receiver, content }) => {
    console.log(`Message from ${sender._id} to ${receiver._id}: ${content}`);

    io.to(receiver._id).emit("new", {
      sender: sender,
      receiver: receiver,
      content,
    });
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
