const mongoose = require("mongoose");
const depositSchema = new mongoose.Schema({
  deposit: {
    type: Number,
    default: 0,
  },
  users: [{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Deposit", depositSchema);
