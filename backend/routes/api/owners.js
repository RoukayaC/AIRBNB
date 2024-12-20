const express = require("express");
const router = express.Router();
const Booking = require("../../models/booking");
const Property = require("../../models/property");
// Get bookings for an owner
router.get("/bookings", async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id }).select(
      "_id"
    );
    const propertyIds = properties.map((p) => p._id);
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate("property")
      .populate("guest");

    res.status(200).json({ status: "ok", bookings });
  } catch (err) {
    console.error("Error fetching owner bookings:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

// Update booking status (approved/rejected)
router.put("/bookings/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ status: "error", msg: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id).populate("property");
    if (!booking) {
      return res
        .status(404)
        .json({ status: "error", msg: "Booking not found" });
    }

    if (booking.property.owner.toString() !== req.user.id) {
      return res.status(403).json({ status: "error", msg: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ status: "ok", booking });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});
// Get all properties for the owner
router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id });
    res.status(200).json({ status: "ok", properties });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});
module.exports = router;
