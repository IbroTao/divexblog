const { USERS } = require("../models/user.model");

const makeAdmin = async (req, res) => {
  try {
    const user = await USERS.findById(req.params.id).select(["-password"]);
    if (!user) return res.status(400).json({ msg: "Failed!" });
    (user.role = "admin"), (user = await user.save());

    const sanitizedUser = { ...user.toObject() };
    delete sanitizedUser.password;
    console.log(sanitizedUser);
    return res.status(200).json({ msg: "Success" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { makeAdmin };
