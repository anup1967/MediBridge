const express = require("express");

const router = express.Router();

const {
  createEmergency,
  getAllRequests,
  updateStatus,
} = require("../controllers/emergencyController");

// Create a new emergency request
router.post("/", createEmergency);

// Get all emergency requests
router.get("/", getAllRequests);

// Update request status
router.put("/:id", updateStatus);

module.exports = router;