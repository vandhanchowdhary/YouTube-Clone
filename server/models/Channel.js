import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  description: String,
  banner: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subscribers: { type: Number, default: 0 },
});

const Channel = mongoose.model("Channel", channelSchema);
export default Channel;