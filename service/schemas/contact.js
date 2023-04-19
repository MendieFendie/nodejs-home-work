const mongoose = require("mongoose");
const { Schema } = mongoose;

const Contact = mongoose.model(
  "contacts",
  new Schema({
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })
);

module.exports = Contact;