import Channel from "../models/Channel.js";

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