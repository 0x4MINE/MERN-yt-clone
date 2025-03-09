import Video from "../models/videoModel.js";
import { createSuccess } from "../utils/success.js";
import { createError } from "../utils/error.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
export const uploadVideo = async (req, res, next) => {
  try {
    const { title, description, videoUrl, thumbnailUrl } = req.body;

    if (!title || !description) {
      throw createError(400, "All fields are required!");
    }

    const video = new Video({
      title,
      description,

      user: req.user,
      videoUrl,
      thumbnailUrl,
    });

    await video.save();

    res.status(201).json(createSuccess(201, "Video Uploaded!"));
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const video = await Video.findById(id).populate([
      { path: "user", select: "name profilePic subscribers" },
      {
        path: "comments",
        populate: { path: "user", select: "name profilePic" },
      },
    ]);

    res.status(200).json(createSuccess(200, video));
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const id = req.params.id;

    const video = await Video.findByIdAndUpdate(id, req.body);

    if (!video) throw createError(404, "Video not found!");
    res.status(200).json(createSuccess(200, "Video updated!"));
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) throw createError(404, "Video not found!");
    res.status(200).json(createSuccess(200, "Video deleted!"));
  } catch (error) {
    next(error);
  }
};
export const getTrending = async (req, res, next) => {
  try {
    //TODO:MAKE TRENDING MORE ADVANCED!

    const videos = await Video.find()
      .sort({ views: -1 })
      .limit(3)
      .populate("user", "name profilePic subscribers");

    res.status(200).json(createSuccess(200, videos));
  } catch (error) {
    next(error);
  }
};

export const getSubscribed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    const videos = await Video.find({
      user: { $in: user.subscribedUsers },
    })
      .sort({ createdAt: -1 })
      .populate("user", "name profilePic subscribers");
    res.status(200).json(createSuccess(200, videos));
  } catch (error) {
    next(error);
  }
};
export const viewIncrease = async (req, res, next) => {
  try {
    //FIXME:MAKE IT MORE SECURE

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );

    res.status(200).json(createSuccess(200, "View added!"));
  } catch (error) {
    next(error);
  }
};
export const searchVideo = async (req, res, next) => {
  try {
    const query = req.query.query;

    const videos = await Video.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: query } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(createSuccess(200, videos));
  } catch (error) {
    next(error);
  }
};

export const likeVideo = async (req, res, next) => {
  try {
    const { id: videoId } = req.params;
    const userId = req.user;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return next(createError(400, "Invalid video ID!"));
    }

    const video = await Video.findById(videoId);
    if (!video) return next(createError(404, "Video not found!"));

    const isLiked = video.likes.includes(userId);

    if (isLiked) {
      await Video.findByIdAndUpdate(videoId, { $pull: { likes: userId } });
      return res.status(200).json(createSuccess(200, "Video unliked!"));
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      });

      return res.status(200).json(createSuccess(200, "Video liked!"));
    }
  } catch (error) {
    next(error);
  }
};

export const dislikeVideo = async (req, res, next) => {
  try {
    const { id: videoId } = req.params;
    const userId = req.user;

    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return next(createError(400, "Invalid video ID!"));
    }

    const video = await Video.findById(videoId);
    if (!video) return next(createError(404, "Video not found!"));

    const isDisliked = video.dislikes.includes(userId);

    if (isDisliked) {
      await Video.findByIdAndUpdate(videoId, { $pull: { dislikes: userId } });
      return res.status(200).json(createSuccess(200, "Video undisliked!"));
    } else {
      await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      });

      return res.status(200).json(createSuccess(200, "Video disliked!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getRecommended = async (req, res, next) => {
  try {
    const videos = await Video.find()
      .sort({ createdAt: -1 })
      .populate("user", "name profilePic subscribers");
    res.status(200).json(createSuccess(200, videos));
  } catch (error) {
    next(error);
  }
};
