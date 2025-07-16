import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const createChannel = async (req, res) => {
  try {
    const { channelName, description, banner } = req.body;
    const existing = await Channel.findOne({ owner: req.user.id });
    if (existing)
      return res.status(400).json({ message: "Channel already exists" });

    const channel = await Channel.create({
      channelName,
      description,
      banner,
      owner: req.user.id,
    });

    res.status(201).json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteChannelById = async (req, res) => {
  try {
    const { id } = req.params;
    const { force } = req.query; // ?force=true if user confirmed deletion

    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Ensure user owns the channel
    if (channel.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const videos = await Video.find({ channel: id });

    if (videos.length > 0 && force !== "true") {
      return res.status(409).json({
        message: "Channel has videos. Confirm deletion to proceed.",
        videosCount: videos.length,
      });
    }

    // If force=true or no videos exist
    if (videos.length > 0) {
      await Video.deleteMany({ channel: id });
    }

    await channel.deleteOne();

    return res.json({ message: "Channel deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });
    if (!channel) return res.status(404).json({ message: "No channel found" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Channel not found" });
    res.json(channel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};