import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  uploader: String, // user ID or name
  channel: String, // channel ID
  views: Number,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  uploadDate: Date,
  category: {
    type: String,
    enum: ["React", "Node", "MongoDB", "CSS", "JavaScript", "Others"], // customizable
    default: "Others",
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
