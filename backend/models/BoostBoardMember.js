const mongoose = require("mongoose");
const { Schema } = mongoose;

const boostBoardMemberSchema = new Schema(
  {
    referenceId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      default: 0,
    },
    side: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const BoostBoardMember = mongoose.model(
  "BoostBoardMember",
  boostBoardMemberSchema
);

module.exports = BoostBoardMember;
