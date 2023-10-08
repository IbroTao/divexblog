const mongoose = require("mongoose");

const LIKES = mongoose.model(
  "blog_likes",
  new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    articleId: mongoose.SchemaTypes.ObjectId,
  })
);

module.exports = { LIKES };
