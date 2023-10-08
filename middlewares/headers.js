const { decode } = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader)
      return res.status(400).json({ msg: "Please add authorization headers!" });

    const decodeJWT = decode(authorizationHeader);
    const userid = decodeJWT.sub;

    (req.userid = userid), next();
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = { authorizeUser };
