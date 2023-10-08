const cloudinary = require("cloudinary");
require("dotenv").config();

const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_NAME = process.env.CLOUDINARY_NAME;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.v2.config({
  api_key: API_KEY,
  api_secret: API_SECRET,
  cloud_name: API_NAME,
});

const uploadToCloud = async (filepath) => {
  const { secure_url } = await cloudinary.v2.uploader.upload(filepath);
  return secure_url;
};

const deleteFromCloud = async (fileurl) => {
  await cloudinary.v2.uploader.destroy(fileurl);
};

module.exports = { uploadToCloud, deleteFromCloud };
