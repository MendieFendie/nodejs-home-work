require("dotenv").config();
const jwt = require("jsonwebtoken");

async function authMiddileware(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  const [token] = req.headers.authorization.split(" ");
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
