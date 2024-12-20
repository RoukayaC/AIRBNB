const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");
const Property = require("../../models/property");

// Get bookings for a user
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id }).populate(
      "property"
    );
    res.status(200).json({ status: "ok", bookings });
  } catch (err) {
    console.error("Error getting user bookings:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

module.exports = router;
