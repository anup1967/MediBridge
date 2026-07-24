import { Pencil, Trash2, BadgeCheck } from "lucide-react";
import RatingStars from "./RatingStars";

export default function ReviewCard({
  review,
  currentUser,
  onEdit,
  onDelete,
}) {
  const isOwner =
    currentUser &&
    review.user &&
    currentUser._id === review.user._id;

  const isAdmin = currentUser?.role === "admin";

  const reviewDate = review.updatedAt || review.createdAt;

  const formattedDate = new Date(reviewDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      <div className="mb-4 flex items-start justify-between">

        <div>

          <RatingStars
            rating={review.rating}
            size={20}
          />

          <div className="mt-3 flex items-center gap-2">

            <h3 className="font-semibold text-slate-800">
              {review.user?.name || "Anonymous"}
            </h3>

            {review.verifiedPatient && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                <BadgeCheck size={14} />
                Verified
              </span>
            )}

          </div>

        </div>

        {(isOwner || isAdmin) && (
          <div className="flex gap-2">

            {isOwner && (
              <button
                onClick={() => onEdit(review)}
                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                title="Edit Review"
              >
                <Pencil size={18} />
              </button>
            )}

            <button
              onClick={() => onDelete(review)}
              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
              title="Delete Review"
            >
              <Trash2 size={18} />
            </button>

          </div>
        )}

      </div>

      <p className="whitespace-pre-wrap leading-7 text-slate-700">
        {review.comment}
      </p>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">

        <span>{formattedDate}</span>

        {review.isEdited && (
          <span className="italic">
            Edited
          </span>
        )}

      </div>

    </div>
  );
}