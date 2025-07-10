import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  thumbnailUrl: String,
  videoUrl: String,
  uploader: String, // user ID or name
  channel: String, // channel ID
  views: Number,
  uploadDate: Date,
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
