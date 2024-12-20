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
    console.error("Error creating booking:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});



module.exports = router;