import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
export const getHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    res.status(200).json(createSuccess(200, user.history));
  } catch (error) {
    next(error);
  }
};
export const addToHistory = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    if (!videoId) throw createError(404, "Video Id is missing!");
    const user = await User.findByIdAndUpdate(req.user, {
      $addToSet: { history: videoId },
    });
    if (!user) throw createError(404, "Cannot add video to history!");
    res.status(200).json(createSuccess(200, "Video Added to history!"));
  } catch (error) {
    next(error);
  }
};
export const deleteFromHistory = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) throw createError(404, "Video Id is missing!");

    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { history: id },
    });

    if (!user) throw createError(404, "Cannot delete Video!");

    res.status(200).json(createSuccess(200, "Video Deleted from history!"));
  } catch (error) {
    next(error);
  }
};
