const mongoose = require("mongoose");

const ROLES = mongoose.model(
  "user_roles",
  new mongoose.Schema(
    {
      user: String,
      role: String,
      request: String,
      image: String,
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { ROLES };
