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

const router = express.Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.delete("/:id", verifyToken, deleteVideo); // Protected
router.put('/:id', verifyToken, updateVideo); // Protected
router.post(
  "/upload",
  verifyToken,
  upload.single("video"),
  async (req, res) => {
    try {
      const { title, description, category, channelId, thumbnailUrl } = req.body;

      const video = await Video.create({
        title,
        description,
        category,
        videoUrl: `/uploads/${req.file.filename}`, // public path
        thumbnailUrl: thumbnailUrl || "", // fallback if not provided
        uploader: req.user.username,
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


export default router;