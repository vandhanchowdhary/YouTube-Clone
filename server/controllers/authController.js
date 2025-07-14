import User from "../models/User.js";
import Channel from "../models/Channel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username, id: user._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const channel = await Channel.findOne({ owner: user._id });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      username: user.username,
      id: user._id,
      channelId: channel?._id || null, // For automatically linking channel if exists
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
