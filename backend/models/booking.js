const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "property",
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("booking", BookingSchema);
module.exports = Booking;
