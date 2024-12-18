const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const users = require("./routes/api/users");
const properties = require("./routes/api/property");
const bookings = require("./routes/api/booking");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(config.get("mongo_url"))
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/user", users);
app.use("/api/property", properties);
app.use("/api/booking", bookings);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
