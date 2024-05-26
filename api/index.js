import express, { application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Connected!"));

const app = express();
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use("/api/user", userRoutes);
app.use("/api/user", authRoutes);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
