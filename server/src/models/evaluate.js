const mongoose = require("mongoose");
const evaluateSchema = new mongoose.Schema(
  {
    period: {
      type: Number,
    },
    periodNumber: {
      type: Array,
    },
    timer: Number,
    result: Array,

    resultUpdate: Array,
    room: String,
    image: String,

    users: [
      {
        UserId: String,
        result: Array,
        periodNumber: Number,
        resultValue: Array,
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
