import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/Authroute.js";
import connectDB from "./lib/Connection.js";
import Homerouter from "./routes/Homeroute.js"; 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/", Homerouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
