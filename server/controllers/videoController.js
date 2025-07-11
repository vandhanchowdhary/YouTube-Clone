import Video from "../models/Video.js";

// This allows frontend to call:  GET /api/videos?channel=channelId
export const getAllVideos = async (req, res) => {
  try {
    const filter = req.query.channel ? { channel: req.query.channel } : {};

    const videos = await Video.find(filter).sort({ uploadDate: -1 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};