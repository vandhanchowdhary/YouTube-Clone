import Video from "../models/Video.js";

// This allows frontend to call:  GET /api/videos?channel=channelId
export const getAllVideos = async (req, res) => {
  try {
    const filter = {};

    if (req.query.search) {
      filter.title = { $regex: req.query.search, $options: "i" };
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    if (req.query.channel) {
      filter.channel = req.query.channel;
    }

    if (req.query.exclude) {
      filter._id = { $ne: req.query.exclude };
    }

    const limit = parseInt(req.query.limit) || 0;

    const videos = await Video.find(filter).limit(limit);
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

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) return res.status(404).json({ message: "Video not found" });

    await video.deleteOne();
    res.json({ message: "Video deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const { title, description } = req.body;
    if (title) video.title = title;
    if (description) video.description = description;

    await video.save();
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};