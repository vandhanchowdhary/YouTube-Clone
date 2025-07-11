import express from "express";
import {
  addComment,
  getCommentsByVideo,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addComment); // POST /api/comments
router.get("/:videoId", getCommentsByVideo); // GET /api/comments/:videoId
router.put("/:id", verifyToken, updateComment); // PUT /api/comments/:id
router.delete("/:id", verifyToken, deleteComment); // DELETE /api/comments/:id

export default router;