import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String, // Store image URL
  createdAt: { type: Date, default: Date.now },
}, {collection : "blog"});

export default mongoose.model("Blog", blogSchema);