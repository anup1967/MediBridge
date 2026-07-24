import { useState } from "react";
import toast from "react-hot-toast";

import api from "../api/api";
import RatingStars from "./RatingStars";
import useAuth from "../hooks/useAuth";

export default function ReviewForm({
  hospitalId,
  reviewId = null,
  initialValues = {
    rating: 5,
    comment: "",
  },
  onReviewSaved,
  onCancel,
}) {
  const { isAuthenticated, isUser } = useAuth();

  const editing = !!reviewId;

  const [rating, setRating] = useState(initialValues.rating);
  const [comment, setComment] = useState(initialValues.comment);
  const [loading, setLoading] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login first.");
      return;
    }

    if (!isUser) {
      toast.error("Only users can submit reviews.");
      return;
    }

    if (comment.trim().length < 10) {
      toast.error("Review should contain at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      if (editing) {
        await api.put(`/reviews/${reviewId}`, {
          rating,
          comment,
        });

        toast.success("Review updated successfully.");
      } else {
        await api.post(`/reviews/${hospitalId}`, {
          rating,
          comment,
        });

        toast.success("Review submitted successfully.");

        setRating(5);
        setComment("");
      }

      await onReviewSaved?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message ??
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !isUser) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold">
          Community Reviews
        </h2>

        <p className="mt-4 text-slate-600">
          Login as a user to submit a review.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        {editing ? "Edit Review" : "Write a Review"}
      </h2>

      <form
        onSubmit={submitReview}
        className="space-y-6"
      >
        <div>
          <label className="mb-2 block font-medium">
            Rating
          </label>

          <RatingStars
            rating={rating}
            editable
            size={30}
            onChange={setRating}
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Your Experience
          </label>

          <textarea
            rows={5}
            maxLength={500}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            placeholder="Share your experience with this hospital..."
            className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-600"
          />

          <p
            className={`mt-2 text-sm ${
              comment.length < 10
                ? "text-red-500"
                : comment.length > 450
                ? "text-yellow-600"
                : "text-slate-500"
            }`}
          >
            {comment.length}/500
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Saving..."
              : editing
              ? "Update Review"
              : "Submit Review"}
          </button>

          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}