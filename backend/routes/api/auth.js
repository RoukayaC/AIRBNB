const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Email already exists" });
    }

    const newUser = new User({ username, email, password, role });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();
    const token = jwt.sign(
      { id: savedUser.id, role: savedUser.role },
      config.get("jwtSecret"),
      {
        expiresIn: config.get("tokenExpire"),
      }
    );

    res.status(200).json({
      status: "ok",
      msg: "Successfully registered",
      token,
      user: savedUser,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      config.get("jwtSecret"),
      {
        expiresIn: config.get("tokenExpire"),
      }
    );

    res.status(200).json({
      status: "ok",
      msg: "Successfully logged in",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
});

module.exports = router;
