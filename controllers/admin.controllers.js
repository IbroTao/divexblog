const { USERS } = require("../models/user.model");

const makeAdmin = async (req, res) => {
  try {
    const user = await USERS.findById(req.params.id).select(["-password"]);
    if (!user) return res.status(400).json({ msg: "User not found!" });
    user.role = "admin";
    await user.save();
    res.status(200).json({ msg: "Success!", data: user.name });
  } catch (e) {
    res.status(500).json(e);
  }
};

const removeAdmin = async (req, res) => {
  try {
    const user = await USERS.findByIdAndRemove(req.params.id).select([
      "-password",
    ]);
    if (!user) return res.status(404).json({ msg: "User not found!" });
    user.role = null;
    await user.save();
    res.status(200).json({ msg: "Success!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const makeEditor = async (req, res) => {
  try {
    const user = await USERS.findById(req.params.id).select(["-password"]);
    if (!user) return res.status(400).json({ msg: "User not found!" });
    user.role = "editor";
    await user.save();
    res.status(200).json({ msg: "Success", data: user.name });
  } catch (e) {
    res.status(500).json(e);
  }
};

const makeAuthor = async (req, res) => {
  try {
    const user = await USERS.findById(req.params.id).select(["-password"]);
    if (!user) return res.status(400).json({ msg: "User not found" });
    user.role = "author";
    await user.save();
    res.status(200).json({ msg: "Success", data: user.name });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await USERS.find().sort({
      createdAt: "desc",
    });
    if (!user) return res.status(400).json({ msg: "Users not found!" });
    return res.status(200).json({ data: user });
  } catch (e) {
    res.status(200).json(e);
  }
};

const getAllEditors = async (req, res) => {
  try {
    const user = await USERS.find({ role: "editor" }).sort({
      createdAt: "desc",
    });
    if (!user) return res.status(404).json({ msg: "Editor(s) not found!" });
    res.status(200).json({ data: user });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const user = await USERS.find({ role: "author" });
    if (!user) return res.status(400).json({ msg: "Author(s) not found!" });
    res.status(200).json({ data: user });
  } catch (e) {
    res.json(e);
  }
};

const getTotalEditors = async (req, res) => {
  const user = await USERS.find({ role: "editor" }).countDocuments();
  if (!user) return res.status(404).json({ msg: "Editor(s) not found!" });
  res.status(200).json({ data: user });
};

const getTotalAuthors = async (req, res) => {
  const user = await USERS.find({ role: "author" }).countDocuments();
  if (!user) return res.status(404).json({ msg: "Author(s) not found!" });
  res.status(200).json({ data: user });
};

module.exports = {
  makeAdmin,
  removeAdmin,
  makeEditor,
  makeAuthor,
  getAllUsers,
  getAllEditors,
  getAllAuthors,
  getTotalEditors,
  getTotalAuthors,
};
