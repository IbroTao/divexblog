const { Router } = require("express");
const {
  makeAdmin,
  makeEditor,
  getAllUsers,
  getAllEditors,
  getAllAuthors,
  getTotalAuthors,
  getTotalEditors,
  makeAuthor,
  removeAdmin,
} = require("../controllers/admin.controllers");
const router = Router();

router.post("/make/admin/:id", makeAdmin);
router.post("remove/admin/:id", removeAdmin);
router.post("/make/editor/:id", makeEditor);
router.post("make/author/:id", makeAuthor);
router.get("/get/all/users", getAllUsers);
router.get("/get/all/editor", getAllEditors);
router.get("/get/all/author", getAllAuthors);
router.get("/get/total/author", getTotalAuthors);
router.get("/get/total/editor", getTotalEditors);

module.exports = router;
