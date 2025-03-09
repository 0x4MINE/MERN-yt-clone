import Comment from "../models/commentModel.js";
import Video from "../models/videoModel.js";
import { createSuccess } from "../utils/success.js";
import { createError } from "../utils/error.js";
import mongoose from "mongoose";
export const addComment = async (req, res, next) => {
  try {
    const { content, video } = req.body;

    if (!content || !video) {
      return next(createError(400, "All fields are required!"));
    }
    if (!mongoose.Types.ObjectId.isValid(video)) {
      return next(createError(404, "Invalid video ID!"));
    }

    const newComment = new Comment({
      content,
      video,
      user: req.user,
    });

    await newComment.save();

    const updatedVideo = await Video.findByIdAndUpdate(
      video,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    if (!updatedVideo) {
      return next(createError(404, "Video not found!"));
    }

    res.status(201).json(
      createSuccess(201, {
        updatedVideo,
        newComment,
      })
    );
  } catch (error) {
    next(error);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) return next(createError(404, "Video ID is required!"));

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(404, "Invalid video ID!"));
    }

    const comments = await Comment.find({ video: id })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    if (!comments) return next(createError(404, "Video not found!"));

    res.status(200).json(createSuccess(200, comments));
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) return next(createError(400, "Comment ID is required!"));
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid comment ID!"));
    }

    const comment = await Comment.findById(id);
    if (!comment) return next(createError(404, "Comment not found!"));

    if (String(comment.user) !== String(req.user)) {
      return next(createError(403, "You can delete only your own comments!"));
    }

    await Comment.findByIdAndDelete(id);

    await Video.findByIdAndUpdate(comment.video, {
      $pull: { comments: id },
    });

    res.status(200).json(createSuccess(200, "Comment deleted successfully!"));
  } catch (error) {
    next(error);
  }
};

export const likeComment = async (req, res, next) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.user;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return next(createError(400, "Invalid comment ID!"));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return next(createError(404, "Comment not found!"));

    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      await Comment.findByIdAndUpdate(commentId, { $pull: { likes: userId } });
      return res.status(200).json(createSuccess(200, "Comment unliked!"));
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $addToSet: { likes: userId },
        $pull: { dislikes: userId },
      });

      return res.status(200).json(createSuccess(200, "Comment liked!"));
    }
  } catch (error) {
    next(error);
  }
};

export const dislikeComment = async (req, res, next) => {
  try {
    const { id: commentId } = req.params;
    const userId = req.user;

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return next(createError(400, "Invalid comment ID!"));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) return next(createError(404, "Comment not found!"));

    const isDisliked = comment.dislikes.includes(userId);

    if (isDisliked) {
      await Comment.findByIdAndUpdate(commentId, {
        $pull: { dislikes: userId },
      });
      return res.status(200).json(createSuccess(200, "Comment undisliked!"));
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        $addToSet: { dislikes: userId },
        $pull: { likes: userId },
      });

      return res.status(200).json(createSuccess(200, "Comment disliked!"));
    }
  } catch (error) {
    next(error);
  }
};
