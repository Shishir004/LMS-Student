import express from "express";
import fs from "fs";
import upload from "../utils/multer.js"; // your multer config
import { uploadMedia } from "../utils/cloudinary.js"; // your Cloudinary uploader

const router = express.Router();

// @route   POST /api/v1/media/upload-video
// @desc    Upload a video file to Cloudinary
// @access  Public or protected (add middleware if needed)
router.post("/upload-video", upload.single("file"), async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload to Cloudinary
    const cloudinaryResult = await uploadMedia(req.file.path);

    // Delete local file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "File uploaded successfully.",
      data: {
        url: cloudinaryResult.secure_url,
        public_id: cloudinaryResult.public_id,
        resource_type: cloudinaryResult.resource_type,
      },
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
});

export default router;
