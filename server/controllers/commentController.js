import mongoose from "mongoose";
import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { videoId, content } = req.body;
    const comment = await Comment.create({
      videoId,
      content,
      authorId: req.user.id,
      authorName: req.user.username,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCommentsByVideo = async (req, res) => {
  try {
    const id = req.params.videoId;
    const comments = await Comment.find({
      $or: [
        { videoId: id }, // string match
        { videoId: mongoose.Types.ObjectId.createFromHexString(id) },
      ],
    }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("Error loading comments:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    comment.content = req.body.content;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.authorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
