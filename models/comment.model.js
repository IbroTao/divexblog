const mongoose = require("mongoose");

const COMMENTS = mongoose.models(
  "blog_comments",
  new mongoose.Schema({
    comments: {
      text: {
        type: String,
      },
      ids: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
  })
);

module.exports = { COMMENTS };
