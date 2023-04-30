const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.model(
  "user",
  new Schema({
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  })
);

module.exports = userSchema;
