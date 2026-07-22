const express = require("express");
const router = express.Router();

const {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  updateResources,
} = require("../controllers/hospitalController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Public
router.get("/", getHospitals);
router.get("/:id", getHospital);

// Admin
router.post("/", protect, adminOnly, createHospital);
router.put("/:id", protect, adminOnly, updateHospital);
router.delete("/:id", protect, adminOnly, deleteHospital);
router.patch("/:id/resources", protect, adminOnly, updateResources);

module.exports = router;