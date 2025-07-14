import express from "express";
import { upload } from "../config/multerConfig.js";
import {
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
} from "../controllers/videoController.js";
import verifyToken from "../middleware/authMiddleware.js";
import Video from "../models/Video.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.delete("/:id", verifyToken, deleteVideo); // Protected
router.put('/:id', verifyToken, updateVideo); // Protected
router.post("/upload", verifyToken, upload.single("video"), async (req, res) => {
    try {

      const { title, description, category, channelId, uploader } =
        req.body;

      // Upload video to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "video",
        folder: "YouTube-Clone_Project-testing", // Existing folder in Cloudinary
      });

      // Delete local copy after upload
      fs.unlinkSync(req.file.path);

      // Cloudinary video URL
      const videoUrl = result.secure_url;

      // Auto-generated thumbnail (1s timestamp)
      const thumbnailUrl = result.secure_url
        .replace("/video/upload/", "/video/upload/so_1/")
        .replace(".mp4", ".jpg");

      const video = await Video.create({
        title,
        description,
        category,
        videoUrl: result.secure_url, // public path
        thumbnailUrl: thumbnailUrl || "", // fallback if not provided
        uploader,
        channel: channelId,
        uploadDate: new Date(),
      });

      res.status(201).json(video);
    } catch (err) {
      console.error("Upload failed:", err.message);
      res.status(500).json({ message: "Upload failed" });
    }
  }
);
router.post("/:id/like", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const video = await Video.findById(req.params.id);

  if (!video) return res.status(404).json({ message: "Video not found" });

  // Remove from dislikes if exists
  video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);

  // Toggle like
  if (video.likes.includes(userId)) {
    video.likes = video.likes.filter((id) => id.toString() !== userId);
  } else {
    video.likes.push(userId);
  }

  await video.save();
  res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
});

router.post("/:id/dislike", verifyToken, async (req, res) => {
  const userId = req.user.id;
  const video = await Video.findById(req.params.id);

  if (!video) return res.status(404).json({ message: "Video not found" });

  // Remove from likes if exists
  video.likes = video.likes.filter((id) => id.toString() !== userId);

  // Toggle dislike
  if (video.dislikes.includes(userId)) {
    video.dislikes = video.dislikes.filter((id) => id.toString() !== userId);
  } else {
    video.dislikes.push(userId);
  }

  await video.save();
  res.json({ likes: video.likes.length, dislikes: video.dislikes.length });
});



export default router;