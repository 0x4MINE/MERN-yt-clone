import Router from "express";
import { createError } from "../utils/error.js";
import {
  checkAuth,
  googleAuth,
  logout,
  signin,
  signup,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googleAuth", googleAuth);
router.get("/logout", verifyToken, logout);
router.get("/checkAuth", verifyToken, checkAuth);

export default router;
