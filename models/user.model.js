const mongoose = require("mongoose");

const USERS = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Provide a valid username!"],
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      role: {
        type: String,
      },
      interest: {
        type: Array,
      },
      darkmode: {
        type: Boolean,
        default: true,
      },
      animations: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { USERS };
