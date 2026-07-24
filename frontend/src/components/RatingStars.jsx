import { Star } from "lucide-react";

export default function RatingStars({
  rating = 0,
  editable = false,
  size = 22,
  onChange = () => {},
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          disabled={!editable}
          onClick={() => editable && onChange(value)}
          className={`transition ${
            editable
              ? "cursor-pointer hover:scale-110"
              : "cursor-default"
          }`}
        >
          <Star
            size={size}
            className={`${
              value <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
}