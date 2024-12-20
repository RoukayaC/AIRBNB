const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const usersRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const properties = require("./routes/api/property");
const bookings = require("./routes/api/booking");
const ownersRouter = require("./routes/api/owners");
const auth = require("./middleware/auth");
const isOwner = require("./middleware/is-owner");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(config.get("mongo_url"))
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRouter);
app.use("/api/users", auth, usersRouter);
app.use("/api/properties", properties);
app.use("/api/bookings", bookings);
app.use("/api/owners", auth, isOwner, ownersRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
