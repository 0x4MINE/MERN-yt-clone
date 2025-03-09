import { Router } from "express";
import {
  getVideo,
  uploadVideo,
  updateVideo,
  deleteVideo,
  getTrending,
  getSubscribed,
  viewIncrease,
  searchVideo,
  likeVideo,
  dislikeVideo,
  getRecommended,
} from "../controllers/videoController.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadToCloudinary } from "../utils/uploadHelper.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files temporarily before uploading
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/crud/upload", verifyToken, uploadVideo);
router.post(
  "/upload-thumbnail",
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const uploadResult = await uploadToCloudinary(req.file, "thumbnails");

      res.json({ url: uploadResult.secure_url });
    } catch (error) {
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const uploadResult = await uploadToCloudinary(req.file, "videos");

    res.json({ url: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

router.get("/crud/:id", getVideo);
router.put("/crud/:id", verifyToken, updateVideo);
router.delete("/crud/:id", verifyToken, deleteVideo);
router.get("/trend", getTrending);
router.get("/recommended", getRecommended);
router.get("/view/:id", viewIncrease);
router.get("/subscribed", verifyToken, getSubscribed);
router.get("/search", searchVideo);
router.patch("/like/:id", verifyToken, likeVideo);

router.patch("/dislike/:id", verifyToken, dislikeVideo);
export default router;
