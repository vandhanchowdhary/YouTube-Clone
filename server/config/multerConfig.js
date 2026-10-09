import multer from "multer";
import path from "path";
import { isAllowedVideoMimeType } from "../utils/validation.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const sanitized = path.basename(file.originalname).replace(/[^a-zA-Z0-9_.-]/g, "_");
    const ext = path.extname(sanitized).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (isAllowedVideoMimeType(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error("Only MP4, MOV, AVI, and WEBM video files are allowed"), false);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});