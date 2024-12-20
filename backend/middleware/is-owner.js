module.exports = (req, res, next) => {
  const user = req.user;
  if (user.role === "owner") {
    next();
  } else {
    console.error("Access forbidden: User is owner");
    return res.status(403).json({ msg: "Access forbidden" });
  }
};
