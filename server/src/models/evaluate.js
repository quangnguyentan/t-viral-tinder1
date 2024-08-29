const mongoose = require("mongoose");
const evaluateSchema = new mongoose.Schema(
  {
    period: {
      type: Number,
      default: 180,
    },
    periodNumber: {
      type: Array,
    },

    result: Array,
    room: String,
    users: [
      {
        UserId: String,
        result: Array,
        periodNumber: Number,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        money: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Evaluate", evaluateSchema);
