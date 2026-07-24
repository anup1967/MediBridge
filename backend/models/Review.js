import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    isEdited: {
      type: Boolean,
      default: false,
    },

    verifiedPatient: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reviews
reviewSchema.index(
  { hospital: 1, user: 1 },
  { unique: true }
);

export default mongoose.model("Review", reviewSchema);