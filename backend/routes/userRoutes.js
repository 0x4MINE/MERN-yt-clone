import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  subscribe,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/subscribe/:id", verifyToken, subscribe);
export default router;
