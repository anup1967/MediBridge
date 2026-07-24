import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../api/api";
import useAuth from "../hooks/useAuth";

import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function ReviewList({ hospitalId }) {
  const { user, isAuthenticated, isUser } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get(`/reviews/${hospitalId}`);

      setReviews(data.reviews ?? []);

      if (isAuthenticated && isUser) {
        const { data: myData } = await api.get(
          `/reviews/${hospitalId}/me`
        );

        setMyReview(myData.review ?? null);
      } else {
        setMyReview(null);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ??
          "Failed to load reviews."
      );
    } finally {
      setLoading(false);
    }
  }, [hospitalId, isAuthenticated, isUser]);

  useEffect(() => {
    void fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (review) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    try {
      await api.delete(`/reviews/${review._id}`);

      toast.success("Review deleted.");

      await fetchReviews();
    } catch (err) {
      toast.error(
        err.response?.data?.message ??
          "Unable to delete review."
      );
    }
  };

  return (
    <div className="space-y-6">

      {isAuthenticated && isUser && (
        <ReviewForm
          key={myReview?._id ?? "new"}
          hospitalId={hospitalId}
          reviewId={myReview?._id}
          initialValues={{
            rating: myReview?.rating ?? 5,
            comment: myReview?.comment ?? "",
          }}
          onCancel={() => setMyReview(null)}
          onReviewSaved={fetchReviews}
        />
      )}

      <div className="rounded-2xl bg-white p-6 shadow">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Community Reviews
          </h2>

          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold">
            {reviews.length} Reviews
          </span>

        </div>

        {loading ? (
          <div className="py-10 text-center text-slate-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-10 text-center text-slate-500">
            No reviews yet.
            <br />
            Be the first to share your experience.
          </div>
        ) : (
          <div className="space-y-5">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUser={user}
                onEdit={setMyReview}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}