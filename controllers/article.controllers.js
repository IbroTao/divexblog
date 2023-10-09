const { BLOG } = require("../models/blog.model");
const { uploadToCloud } = require("../utilis/cloudinary");

const createBlog = async (req, res) => {
  try {
    const { file, body } = req;
    // const url = await uploadToCloud(file.path);

    const blog = await BLOG.create({
      image: file.path,
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
      description: req.body.description,
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
    await blog.save();
    return res.status(200).json({ msg: "Success" });
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
    await blog.save();
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
    await viewBlog.save();
    return res.status(200).json({ msg: "Success!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getMostLikedBlog = async (req, res) => {
  try {
    const blog = await BLOG.findById({ userId: req.params.id })
      .sort({
        likes: -1,
      })
      .limit(1);
    return res.status(200).json({ msg: "Success!", blog });
  } catch (e) {
    res.stattus(500).json(e);
  }
};

const getMostViewedBlog = async (req, res) => {
  try {
    const blog = await BLOG.findById({ userId: req.params.id })
      .sort({
        likes: -1,
      })
      .limit(1);
    return res.status(200).json({ msg: "Success!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getLatestBlog = async (req, res) => {
  try {
    const blog = await BLOG.findById({ userId: req.params.id })
      .sort({
        createdAt: -1,
      })
      .limit(1);
    return res.status(200).json({ msg: "Success!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const threeMostLikedBlogs = async (req, res) => {
  try {
    const blog = await BLOG.findById({ userId: req.params.id })
      .sort({
        likes: -1,
      })
      .limit(3);
    return res.status(200).json({ msg: "Success!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const threeMostViewedBlogs = async (req, res) => {
  try {
    const blog = await BLOG.findById({ userId: req.params.id })
      .sort({
        views: -1,
      })
      .limit(3);
    if (!blog) return res.status(404).json({ msg: "Blog not found!" });
    return res.status(200).json({ msg: "Success", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getEducationalBlog = async (req, res) => {
  try {
    const blog = await BLOG.find({ category: "educational" }).sort({
      createdAt: "desc",
    });
    if (!blog) return res.status(404).json({ msg: "Blog(s) not found!" });
    return res.status(200).json({ msg: "Success", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getSportsBlog = async (req, res) => {
  try {
    const blog = await BLOG.find({ category: "sports" }).sort({
      createdAt: "desc",
    });
    if (!blog) return res.status(404).json({ msg: "Post not found!" });
    return res.status(200).json({ msg: "Success!", blog });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getTechBlog = async (req, res) => {
  try {
    const blog = await BLOG.find({ category: "tech" }).sort({
      createdAt: "desc",
    });
    if (!blog) return res.status(404).json({ msg: "Blog not found!" });

    return res.status(200).json({ msg: "Blog not found!" });
  } catch (e) {
    res.status(500).json(e);
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blog = await BLOG.find().sort({ createdAt: "desc" });
    if (!blog) return res.status(404).json({ msg: "Post not found!" });

    return res.status(200).json({ msg: "Success!", blog });
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
  getMostLikedBlog,
  getMostViewedBlog,
  getLatestBlog,
  threeMostLikedBlogs,
  threeMostViewedBlogs,
  getEducationalBlog,
  getSportsBlog,
  getTechBlog,
  getAllBlogs,
};
