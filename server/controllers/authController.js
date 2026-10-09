import User from "../models/User.js";
import Channel from "../models/Channel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateLoginInput, validateRegistrationInput } from "../utils/validation.js";

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const validationError = validateRegistrationInput({ username, email, password });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password.trim(), 10);
    const newUser = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashed,
    });

    const token = signToken(newUser._id);
    return res.json({ token, username: newUser.username, id: newUser._id });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validationError = validateLoginInput({ email, password });

    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const channel = await Channel.findOne({ owner: user._id });
    const token = signToken(user._id);

    return res.json({
      token,
      username: user.username,
      id: user._id,
      channelId: channel?._id || null,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
