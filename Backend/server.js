import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import messageRoutes from "./messages.js";   // <-- import

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Multer setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "lost_found_items", allowed_formats: ["jpg", "png", "jpeg"] },
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

// Routes
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Fetch all items
// Get all items
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find().sort({ _id: -1 }); // latest first
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/api/items/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});
// Fetch items for a specific user (by email)
app.get("/api/items/user/:email", async (req, res) => {
  try {
    const items = await Item.find({ userEmail: req.params.email }).sort({ _id: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Error fetching items" });
  }
});

// Update item (edit popup will use this)
app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        status: req.body.status,
        location: req.body.location,
      },
      { new: true } // return updated doc
    );
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: "Error updating item" });
  }
});

// ✅ mount messages route
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
