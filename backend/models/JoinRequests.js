const mongoose = require("mongoose");
const { Schema } = mongoose;

const joiningRequestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userReferenceId: {
      type: String,
      required: true,
    },

    recieptKey: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    usdtTrcId: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "initiated",
    },
  },
  { timestamps: true }
);

const JoiningRequest = mongoose.model("JoiningRequest", joiningRequestSchema);

module.exports = JoiningRequest;
