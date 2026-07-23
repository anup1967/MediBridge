import express from "express";

import upload from "../middleware/upload.js";

import {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
  updateResources,
} from "../controllers/hospitalController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getHospitals);
router.get("/:id", getHospital);

// Admin Routes
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  createHospital
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateHospital
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteHospital
);

router.patch(
  "/:id/resources",
  protect,
  adminOnly,
  updateResources
);

export default router;