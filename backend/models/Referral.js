const mongoose = require("mongoose");
const { Schema } = mongoose;

const referralSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  countDown: {
    type: Number,
    required: true,
  },
});

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
