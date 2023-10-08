const { hashSync, compareSync } = require("bcryptjs");
const { USERS } = require("../models/user.model");
const { sign } = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await USERS.findOne({ email });
  if (user)
    return res.status(400).json({ msg: "Existing email, try another email!" });

  await USERS.create({ username, email, password: hashSync(password, 10) });
  res.status(200).json({ msg: "User registered!" });
};

const createToken = (userid) => {
  return sign(
    {
      sub: userid,
      exP: 300000,
    },
    ACCESS_TOKEN
  );
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await USERS.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ msg: "Email already used, try another one!" });

  const isPasswordSame = compareSync(password, user.password);
  if (!isPasswordSame) return res.status(400).json({ msg: "Wrong password!" });

  const jwtToken = createToken(user._id);
  const returnUser = await USERS.findById(user._id).select(["-password"]);

  res.status(200).json({
    user: returnUser,
    token: jwtToken,
    msg: "User logged in!",
  });
};
module.exports = { registerUser, loginUser };
