const mongoose = require("mongoose");

const DRAFTS = mongoose.model(
  "blog_drafts",
  new mongoose.Schema({
    head: {
      type: String,
    },
    content: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
    },
  })
);

module.exports = { DRAFTS };
