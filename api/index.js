import express from "express";
import mongoose from "mongoose";
mongoose
  .connect("mongodb://127.0.0.1:27017/blog")
  .then(() => console.log("Connected!"));

const app = express();
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
