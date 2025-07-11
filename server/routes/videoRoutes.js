import express from "express";
import {
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
} from "../controllers/videoController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/:id", getVideoById);
router.delete("/:id", verifyToken, deleteVideo); // Protected
router.put('/:id', verifyToken, updateVideo); // Protected


export default router;