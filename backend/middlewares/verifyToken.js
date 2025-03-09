import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) throw createError(401, "Token not found!");

    const decoded = jwt.verify(token, process.env.JWT);

    req.user = decoded.id;

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      status: error.status,
      message: error.message,
    });
  }
};
