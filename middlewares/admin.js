const { USERS } = require("../models/user.model");

const grantAcccess = async (req, res, next) => {
  const userId = req.get("userAccess");
  USERS.findOne({ _id: userId }).then((data) => {
    if (!data) return res.status(400).json({ msg: "Error!" });
    const userRole = data.role;
    if (userRole === "admin") {
      return next();
    } else if (userRole === "reader") {
      return res.status(402).json({ msg: "You should not be here!" });
    }
    res.status(400).json({ msg: "You are not an admin!" });
  });
};

module.exports = { grantAcccess };
