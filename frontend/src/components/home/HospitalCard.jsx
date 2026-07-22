import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Star,
  Bed,
  Wind,
  Activity,
  Clock,
} from "lucide-react";

export default function HospitalCard({ hospital }) {
  if (!hospital) return null;

  const {
    _id,
    name,
    city,
    address,
    image,
    rating,
    reviewCount,
    beds,
    oxygen,
    ventilators,
    emergency,
    ambulance,
    waitingTime,
    phone,
  } = hospital;

  const getColor = (value) => {
    if (value <= 3) return "text-red-600";
    if (value <= 7) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <Link to={`/hospital/${_id}`}>

        <div className="relative">
          <img
            src={image || "/hero.png"}
            alt={name}
            className="h-56 w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          <div className="absolute bottom-4 left-4">
            <h2 className="text-2xl font-bold text-white">
              {name}
            </h2>

            <div className="flex items-center gap-1 text-sm text-gray-200">
              <MapPin size={15} />
              <span>{city}</span>
            </div>
          </div>

          <div className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow">
            <div className="flex items-center gap-1">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              <span className="font-semibold">{rating}</span>
            </div>

            <p className="text-center text-[10px] text-gray-500">
              {reviewCount} reviews
            </p>
          </div>

        </div>

      </Link>

      <div className="p-5">

        <div className="mb-5 grid grid-cols-2 gap-3">

          <div className="rounded-xl bg-slate-100 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Bed size={18} />
              ICU Beds
            </div>

            <div className={`mt-2 text-2xl font-bold ${getColor(Number(beds) || 0)}`}>
              {beds}
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Wind size={18} />
              Oxygen
            </div>

            <div className={`mt-2 text-2xl font-bold ${getColor(Number(oxygen) || 0)}`}>
              {oxygen}
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Activity size={18} />
              Ventilators
            </div>

            <div className={`mt-2 text-2xl font-bold ${getColor(Number(ventilators) || 0)}`}>
              {ventilators}
            </div>
          </div>

          <div className="rounded-xl bg-slate-100 p-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock size={18} />
              Waiting
            </div>

            <div className="mt-2 text-2xl font-bold text-blue-600">
              {waitingTime ?? 0} min
            </div>
          </div>

        </div>

        <div className="mb-4 flex flex-wrap gap-2">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              emergency
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {emergency ? "🚑 Emergency Available" : "Emergency Busy"}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              ambulance
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {ambulance ? "🚓 Ambulance Available" : "Ambulance Busy"}
          </span>

        </div>

        <div className="mb-5 flex items-start gap-2 text-sm text-gray-600">
          <MapPin size={16} className="mt-0.5 text-blue-600" />
          <span>{address}</span>
        </div>

        <div className="flex gap-3">

          <a
            href={`tel:${phone}`}
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            <Phone className="mr-2 inline" size={18} />
            Call
          </a>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address
            )}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-xl border border-slate-300 py-3 text-center font-semibold transition hover:bg-slate-100"
          >
            Directions
          </a>

        </div>

      </div>

    </div>
  );
}