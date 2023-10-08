const { Router } = require("express");
const { makeAdmin } = require("../controllers/admin.controllers");
const { authorizeUser } = require("../middlewares/headers");
const router = Router();

router.post("make/admin/:id", authorizeUser, makeAdmin);

module.exports = router;
