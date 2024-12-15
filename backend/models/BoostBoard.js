const mongoose = require("mongoose");
const { Schema } = mongoose;

const boostBoardSchema = new Schema({
  planType: {
    type: String,
    default: "",
  },
  nodeNo: {
    type: Number,
    default: 0,
  },
  userId: {
    type: String,
    default: null,
  },
  parent: {
    type: Number,
    default: null,
  },
  leftChild: {
    type: String,
    default: null,
  },
  rightChild: {
    type: String,
    default: null,
  },
});

const BoostBoard = mongoose.model("BoostBoard", boostBoardSchema);

module.exports = BoostBoard;
