const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    logger.warn("Invalid token", err);
    req.user = null;
  }
  return next();
}

module.exports = { authMiddleware };
