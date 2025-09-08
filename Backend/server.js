import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

dotenv.config(); // load .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Multer Cloudinary setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lost_found_items",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// Item Schema
const itemSchema = new mongoose.Schema({
  title: String,
  type: String,
  status: String,
  location: String,
  description: String,
  imageUrl: String,
  userEmail: String,
});
const Item = mongoose.model("Item", itemSchema);

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    res.json({ imageUrl: req.file.path }); // Cloudinary URL
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save item route
app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
