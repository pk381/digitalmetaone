const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      default: "",
    },
    emailAddress: {
      type: String,
      required: false,
      default: "",
    },
    mobileNumber: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    planType: {
      type: String,
      default: "inactive",
    },

    type: {
      type: String,
      default: "user",
    },

    profilePicture: {
      type: String,
      default: null,
    },

    balance: {
      type: Number,
      default: 0,
    },
    withdrawals: {
      type: Number,
      default: 0,
    },
    direct: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: "",
    },
    isEligibleToJoinBoostBoard: {
      type: Boolean,
      default: true,
    },

    directUsersActive: {
      type: Number,
      default: 0,
    },

    boost: {
      type: Number,
      default: 5,
    },

    referenceId: {
      type: String,
      default: "",
    },
    underId: {
      type: String,
      default: "",
    },
    downline: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
