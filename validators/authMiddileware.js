require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddileware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  const [tokenType, token] = req.headers.authorization.split(" ");
  if (!token) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);
    req.user = user;

    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
}

module.exports = authMiddileware;
