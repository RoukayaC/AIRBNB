const express = require("express");
const router = express.Router();
const Property = require("../../models/property");
const auth = require("../../middleware/auth");
const isOwner = require("../../middleware/is-owner");
const multer = require("../../lib/multer");
// Create a new property
router.post("/", auth, isOwner, multer.single("file"), async (req, res) => {
  try {
    const { title, price, location } = req.body;
    let file = req.file ?? null;

    const property = new Property({
      owner: req.user.id,
      title,
      price,
      location,
      imageUrl: file ? file.filename : "",
    });

    await property.save();
    res.status(201).json({ status: "ok", property });
  } catch (err) {
    console.error("Error creating property:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const properties = await Property.find({ status: "active" });
    res.status(200).json({ status: "ok", properties });
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

// Update a property
router.put("/:id", auth, isOwner, multer.single("file"),  async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property || property.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ status: "error", msg: "you can access this property" });
    }
    let file = req.file ?? null;

    Object.assign(property, {
      ...req.body,
      ...(file && { imageUrl: req.file.filename }),
    });
    await property.save();

    res.status(200).json({ status: "ok", property });
  } catch (err) {
    console.error("Error updating property:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

// Delete a property
router.delete("/:id", auth, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property || property.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ status: "error", msg: "Property not found" });
    }

    await property.deleteOne();
    res.status(200).json({ status: "ok", msg: "Property deleted" });
  } catch (err) {
    console.error("Error deleting property:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

// Toggle property status endpoint
router.put("/:id/status", auth,  isOwner, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property || property.owner.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ status: "error", msg: "Property not found" });
    }

    property.status = property.status === "active" ? "inactive" : "active";
    await property.save();

    res.status(200).json({ status: "ok", property });
  } catch (err) {
    console.error("Error toggling property status:", err);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});

module.exports = router;
