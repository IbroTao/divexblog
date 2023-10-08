const { BLOG } = require("../models/blog.model");
const { uploadToCloud } = require("../utilis/cloudinary");

const createBlog = async (req, res) => {
  try {
    const { file, body } = req;
    const url = await uploadToCloud(file.path);

    const blog = await BLOG.create({
      image: url,
      title: body.title,
      description: body.description,
      content: body.content,
      category: body.category,
      userid: req.userid,
    });
    res.status(201).json({ msg: "Blog created!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const editBlog = async (req, res) => {
  try {
    const blog = await BLOG.findByIdAndUpdate(req.params.id, {
      content: req.body.content,
    });

    if (!blog) return res.status(404).json({ msg: "Blog not found!" });

    res.status(200).json({ msg: "Blog edited and updated!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById(id);

    if (!blog) return res.status(404).json({ msg: "Blog not found!" });

    res.status(200).json({ msg: "Blog found!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findByIdAndDelete(id);

    if (!blog) return res.status(404).json({ msg: "Blog not found!" });

    res.status(200).json({ msg: "Blog deleted!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const addLike = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById(id);
    if (!blog) return res.status(400).json({ msg: "Blog not found!" });

    blog.likes = blog.likes + 1;
    blog = await blog.save();
    return res.status(201).json({ msg: "Success" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const removeLike = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById(id);
    if (!blog) return res.status(404).json({ msg: "Blog not found!" });

    blog.likes = blog.likes - 1;
    blog = await blog.save();
    return res.status(200).json({ msg: "Success!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const setViews = async (req, res) => {
  try {
    const viewBlog = await BLOG.findById(req.params.id);
    if (!viewBlog) return res.status(400).json({ msg: "Error!" });

    viewBlog.views = viewBlog.views + 1;
    viewBlog = await viewBlog.save();
    return res.status(200).json({ msg: "Success!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  createBlog,
  editBlog,
  getSingleBlog,
  deleteBlog,
  addLike,
  removeLike,
  setViews,
};
