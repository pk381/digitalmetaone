const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailyClubEntrySchema = new Schema(
  {
    userReferenceId: {
      type: String,
      default: "",
    },

    upgradedPlantype: {
      type: String,
      default: "",
    },

    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const DailyClubEntry = mongoose.model("DailyClubEntry", dailyClubEntrySchema);

module.exports = DailyClubEntry;
