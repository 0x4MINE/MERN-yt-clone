import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import mongoose from "mongoose";
export const getUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createError(400, "User id is not valid!");

    const user = await User.findById(req.params.id).select("-password ");
    if (!user) throw createError(404, "User not found!");
    res.status(200).json(createSuccess(200, user));
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createError(400, "User id is not valid!");

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw createError(404, "User not found!");
    res.status(200).json(createSuccess(200, "User Deleted!"));
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createError(400, "User id is not valid!");

    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) throw createError(404, "User not found!");
    res.status(200).json(createSuccess(200, "Profile Updated!"));
  } catch (error) {
    next(error);
  }
};


export const subscribe = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      throw createError(400, "User id is not valid!");

    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user);

    if (!user) throw createError(404, "User not found!");

    if (currentUser.subscribedUsers.includes(user._id)) {
      currentUser.subscribedUsers.pull(user._id);
      user.subscribers.pull(currentUser._id);
    } else {
      currentUser.subscribedUsers.push(user._id);
      user.subscribers.push(currentUser._id);
    }

    await currentUser.save();
    await user.save();

    res.status(200).json(createSuccess(200, user));
  } catch (error) {
    next(error);
  }
}; 