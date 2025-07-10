import express from "express";
import {
  createChannel,
  getChannelById,
  getMyChannel,
} from "../controllers/channelController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createChannel); // POST /api/channels
router.get("/me", verifyToken, getMyChannel); // GET /api/channels/me
router.get("/:id", getChannelById); // GET /api/channels/:id

export default router;