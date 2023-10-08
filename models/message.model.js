const mongoose = require("mongoose");

const MESSAGE = mongoose.model(
  "messages",
  new mongoose.Schema(
    {
      message: {
        text: {
          type: String,
        },
        from: {
          type: String,
        },
        to: {
          type: String,
        },
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { MESSAGE };
