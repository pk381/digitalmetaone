const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  earningInLifetime: {
    type: Number,
    required: false,
  },
  earningInThisMonth: {
    type: Number,
    required: false,
  },
  greenMemberInLifetime: {
    type: Number,
    required: false,
  },
  greenMemberInThisMonth: {
    type: Number,
    required: false,
  },
  redMemberInLifetime: {
    type: Number,
    required: false,
  },
  redMemberInThisMonth: {
    type: Number,
    required: false,
  },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
