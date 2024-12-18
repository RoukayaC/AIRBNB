const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");
const Property = require("../../models/property");
const auth = require("../../middleware/auth");

// Create a booking
router.post("/", auth, async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, totalPrice } = req.body;

    const booking = new Booking({
      property: propertyId,
      guest: req.user.id,
      checkIn,
      checkOut,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ status: "ok", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

// Get bookings for a user
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id }).populate(
      "property"
    );
    res.status(200).json({ status: "ok", bookings });
  } catch (err) {
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

module.exports = router;
