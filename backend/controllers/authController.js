import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw createError(404, "there's no account with this email!");

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) throw createError(401, "Wrong credentiels");

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.cookie("token", token);

    res.status(200).json(
      createSuccess(200, {
        ...user._doc,
        password: "",
      })
    );
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json(createError(200, "Logged out successfully!"));
  } catch (error) {
    next(error);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const emailUnique = await User.findOne({ email });

    if (emailUnique) {
      throw createError(409, "This email already registred!");
    }

    // if (await User.findOne({ name })) {
    //   throw createError(409, "This name already Used!");
    // }

    if (password.length <= 6)
      throw createError(422, "This password is too short!");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(createSuccess(201, newUser));
  } catch (error) {
    next(error);
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select("-password");
    res.status(200).json(createSuccess(200, user));
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const { email, name, profilePic } = req.body;

    let user = await User.findOne({ email });

    // If user does not exist, create a new one
    if (!user) {
      user = new User({
        name,
        email,
        profilePic,
        fromGoogle: true,
      });
      await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json(
      createSuccess(200, {
        ...user._doc,
      })
    );
  } catch (error) {
    next(error);
  }
};
