import express from "express";

import {
  createEmergency,
  getAllRequests,
  updateStatus,
} from "../controllers/emergencyController.js";

const router = express.Router();

// Create a new emergency request
router.post("/", createEmergency);

// Get all emergency requests
router.get("/", getAllRequests);

// Update request status
router.put("/:id", updateStatus);

export default router;