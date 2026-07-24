import Review from "../models/Review.js";
import Hospital from "../models/Hospital.js";

/*
    Helper function to recalculate hospital rating
*/
const updateHospitalRating = async (hospitalId) => {
  const reviews = await Review.find({ hospital: hospitalId });

  const reviewCount = reviews.length;

  let averageRating = 0;

  if (reviewCount > 0) {
    const totalRating = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    averageRating = Number((totalRating / reviewCount).toFixed(1));
  }

  await Hospital.findByIdAndUpdate(hospitalId, {
    rating: averageRating,
    reviewCount,
  });
};

/*
    Create Review
*/
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { hospitalId } = req.params;
// Validate rating
if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
  return res.status(400).json({
    success: false,
    message: "Rating must be an integer between 1 and 5.",
  });
}

// Validate comment
if (!comment || comment.trim().length < 10) {
  return res.status(400).json({
    success: false,
    message: "Review must contain at least 10 characters.",
  });
}
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message: "Only users can submit reviews.",
      });
    }

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found.",
      });
    }

    const existingReview = await Review.findOne({
      hospital: hospitalId,
      user: req.user._id,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this hospital.",
      });
    }

    const review = await Review.create({
      hospital: hospitalId,
      user: req.user._id,
      rating,
      comment,
    });

    await updateHospitalRating(hospitalId);

    res.status(201).json({
      success: true,
      message: "Review submitted successfully.",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    Get Hospital Reviews
*/
export const getHospitalReviews = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const reviews = await Review.find({
      hospital: hospitalId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/*
    Get Logged-in User's Review for a Hospital
*/
export const getMyReview = async (req, res) => {
  try {
    const { hospitalId } = req.params;

    const review = await Review.findOne({
      hospital: hospitalId,
      user: req.user._id,
    });

    if (!review) {
      return res.json({
        success: true,
        review: null,
      });
    }

    res.json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
/*
    Update Review
*/
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
// Validate rating
if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
  return res.status(400).json({
    success: false,
    message: "Rating must be an integer between 1 and 5.",
  });
}

// Validate comment
if (!comment || comment.trim().length < 10) {
  return res.status(400).json({
    success: false,
    message: "Review must contain at least 10 characters.",
  });
}
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own review.",
      });
    }

    review.rating = rating;
    review.comment = comment;
    review.isEdited = true;

    await review.save();

    await updateHospitalRating(review.hospital);

    res.json({
      success: true,
      message: "Review updated successfully.",
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
    Delete Review
*/
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    const isOwner =
      review.user.toString() === req.user._id.toString();

    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const hospitalId = review.hospital;

    await review.deleteOne();

    await updateHospitalRating(hospitalId);

    res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};