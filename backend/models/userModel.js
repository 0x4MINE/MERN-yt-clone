import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: function () {
        return !this.fromGoogle;
      },
    },
    subscribers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    subscribedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    history: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  },

  {
    timestamps: true,
  }
);

const user = mongoose.model("User", UserSchema);
export default user;
