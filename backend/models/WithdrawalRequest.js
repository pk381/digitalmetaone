const mongoose = require("mongoose");
const { Schema } = mongoose;

const withdrawalRequestSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    cryptoId: {
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

const WithdrawalRequest = mongoose.model(
  "WithdrawalRequest",
  withdrawalRequestSchema
);

module.exports = WithdrawalRequest;
