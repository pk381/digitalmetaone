const mongoose = require("mongoose");
const { Schema } = mongoose;

const upgradeRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  transactionId: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "initiated",
  },
});

const UpgradeRequest = mongoose.model("UpgradeRequest", upgradeRequestSchema);

module.exports = UpgradeRequest;
