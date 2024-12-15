const mongoose = require("mongoose");
const { Schema } = mongoose;

const boostDetailsSchema = new Schema({
  planType: {
    type: String,
    default: "",
  },

  parent: {
    type: Number,
    default: null,
  },

  lastChild: {
    type: Number,
    default: null,
  },
});

const BoostDetails = mongoose.model("BoostDetails", boostDetailsSchema);

module.exports = BoostDetails;
