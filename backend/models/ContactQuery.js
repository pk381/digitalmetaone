const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactQuerySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
});

const ContactQuery = mongoose.model("ContactQuery", contactQuerySchema);

module.exports = ContactQuery;
