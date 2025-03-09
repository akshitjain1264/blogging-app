import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./blogRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve images
app.use("/api", blogRoutes);

mongoose
  .connect("mongodb://localhost:27017/blogDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
