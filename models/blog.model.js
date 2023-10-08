const mongoose = require("mongoose");

const BLOG = mongoose.model(
  "blog_articles",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "Provide a title for your article!"],
      },
      description: {
        type: String,
        required: [true, "Provide a description for your article!"],
      },
      content: {
        type: String,
        required: [true, "Provide content for your article"],
      },
      image: {
        type: String,
        required: [true, "Provide an image for your article"],
      },
      userid: {
        type: mongoose.SchemaTypes.ObjectId,
      },
      likes: {
        type: Number,
        default: 0,
      },
      views: {
        type: Number,
        default: 0,
      },
      author: {
        type: String,
      },
      category: {
        type: String,
        required: true,
      },
      isReviewed: {
        type: Boolean,
        default: false,
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { BLOG };
