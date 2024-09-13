const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: String,
    avatar: {
      type: String,
      default: "",
    },
    fullName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    nameOfBank: {
      type: String,
    },
    nameOfUser: {
      type: String,
    },
    creditCartOfBank: {
      type: String,
    },
    result: Array,
    periodNumber: Array,
    createdAt: Array,
    deposit: {
      type: Number,
      default: 0,
      required: true,
    },
    withDraw: {
      type: Number,
      default: 0,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: String,
    vip: {
      type: String,
      default: 0,
    },
    vipThumbnail: {
      type: String,
    },
    accessWithDraw: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
