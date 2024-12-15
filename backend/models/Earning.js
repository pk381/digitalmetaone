const mongoose = require("mongoose");
const { Schema } = mongoose;

const earningSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  referenceId: {
    type: String,
    default: "",
  },

  total: {
    type: Number,
    default: 0,
  },

  today: {
    type: Number,
    default: 0,
  },
  direct: {
    type: Number,
    default: 0,
  },
  dailyClub: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  boost: {
    type: Number,
    default: 0,
  },
  autoPool: {
    type: Number,
    default: 0,
  },
  reward: {
    type: Number,
    default: 0,
  },
  dailyClubStarter: {
    type: Number,
    default: 0,
  },
  dailyClubBasic: {
    type: Number,
    default: 0,
  },
  dailyClubStar: {
    type: Number,
    default: 0,
  },
  dailyClubSuperstar: {
    type: Number,
    default: 0,
  },
  dailyClubPrime: {
    type: Number,
    default: 0,
  },
  dailyClubRoyal: {
    type: Number,
    default: 0,
  },
  widthdrawl: {
    type: Number,
    default: 0,
  },
});

const Earning = mongoose.model("Earning", earningSchema);

module.exports = Earning;
