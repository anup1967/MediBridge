import express from "express";

import {
  createReview,
  getHospitalReviews,
  getMyReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();
router.get("/:hospitalId/me", protect, getMyReview);

router.get("/:hospitalId", getHospitalReviews);
/*
    Get all reviews for a hospital
*/
router.get("/:hospitalId", getHospitalReviews);

/*
    Create review
*/
router.post("/:hospitalId", protect, createReview);

/*
    Update own review
*/
router.put("/:reviewId", protect, updateReview);

/*
    Delete review
*/
router.delete("/:reviewId", protect, deleteReview);

export default router;