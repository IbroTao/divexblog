const { Router } = require("express");
const multer = require("multer");
const { authorizeUser } = require("../middlewares/headers");
const { fileFilter, fileStorage } = require("../configs/multer.configs");
const {
  createBlog,
  editBlog,
  getSingleBlog,
  deleteBlog,
  addLike,
  removeLike,
  setViews,
} = require("../controllers/article.controllers");
const router = Router();

router.post(
  "/create",
  authorizeUser,
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"),
  createBlog
);
router.post("/like/:id", authorizeUser, addLike);
router.post("/unlike/:id", authorizeUser, removeLike);
router.post("/views/:id", authorizeUser, setViews);
router.put("/edit/:id", authorizeUser, editBlog);
router.get("/:id", getSingleBlog);
router.delete("/delete/:id", deleteBlog);
module.exports = router;
