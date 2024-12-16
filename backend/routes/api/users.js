const router = require("express").Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// Register route
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Email already exists" });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password, role });

    // Generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser.id }, config.get("jwtSecret"), {
      expiresIn: config.get("tokenExpire"),
    });

    // Send response with token and user details
    res.status(200).json({
      status: "ok",
      msg: "Successfully registered",
      token,
      user: savedUser,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "not ok", msg: "Please enter all required data" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "not ok", msg: "Invalid email or password" });
    }

    // Generate JWT token if credentials are valid
    const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), {
      expiresIn: config.get("tokenExpire"),
    });

    // Send response with token and user details
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
    return res
      .status(500)
      .json({ status: "error", msg: "Internal server error" });
  }
});

module.exports = router;
