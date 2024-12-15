const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailyClubSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  starter: {
    type: Number,
    required: true,
  },
  basic: {
    type: Number,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  superStart: {
    type: Number,
    required: true,
  },
  prime: {
    type: Number,
    required: true,
  },
  royal: {
    type: Number,
    required: true,
  },
});

const DailyClub = mongoose.model("DailyClub", dailyClubSchema);

module.exports = DailyClub;
