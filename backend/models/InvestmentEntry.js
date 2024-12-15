const mongoose = require("mongoose");
const { Schema } = mongoose;

const investmentEntrySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    underId: {
      type: String,
      required: true,
    },
    side: {
      type: String,
      required: true,
    },
    isUtilized: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const InvestmentEntry = mongoose.model(
  "InvestmentEntry",
  investmentEntrySchema
);

module.exports = InvestmentEntry;
