import express from "express";
import { getAllVideos, getVideoById } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos); // GET /api/videos
router.get("/:id", getVideoById); // GET /api/videos/:id

export default router;