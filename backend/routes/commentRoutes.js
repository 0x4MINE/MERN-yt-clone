import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComments,
  likeComment,
  dislikeComment,
} from "../controllers/commentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/add", verifyToken, addComment);
router.get("/comments/:id", getComments);
router.delete("/comments/:id", verifyToken, deleteComment);
router.patch("/like/:id", verifyToken, likeComment);
router.patch("/dislike/:id", verifyToken, dislikeComment);
export default router;
