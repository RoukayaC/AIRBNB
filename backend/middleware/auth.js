const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    console.error("Access denied: No token provided");
    return res.status(401).json({ msg: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded
    console.log("Authenticated user:", req.user);
    next();
  } catch (err) {
    console.error("Invalid token:", err.message);
    return res.status(401).json({ msg: "Invalid token" });
  }
};
