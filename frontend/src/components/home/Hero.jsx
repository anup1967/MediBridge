import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  MapPin,
  ShieldCheck,
  BedDouble,
  Wind,
  HeartPulse,
} from "lucide-react";

import heroIllustration from "../../assets/hero-illustration.png";

function Hero() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) {
      navigate("/hospitals");
      return;
    }

    navigate(`/hospitals?search=${encodeURIComponent(query)}`);
  };

const handleCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      navigate(`/hospitals?lat=${lat}&lng=${lng}`);
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert("Please allow location access.");
          break;

        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.");
          break;

        case error.TIMEOUT:
          alert("Location request timed out.");
          break;

        default:
          alert("Unable to retrieve your location.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  );
};

  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center gap-16 px-6 py-16 lg:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <ShieldCheck size={16} />
            Trusted Emergency Healthcare Platform
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-tight text-slate-900 lg:text-6xl">
            Emergency care,
            <br />
            <span className="text-blue-600">
              when every second matters.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Find nearby hospitals with real-time emergency resource
            availability including ICU beds, oxygen support,
            ventilators and emergency services.
          </p>

          {/* Search */}
          <div className="mt-10 flex overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
            <div className="flex flex-1 items-center gap-3 px-5">
              <Search className="text-slate-400" size={20} />

              <input
                type="text"
                placeholder="Search hospitals..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="w-full py-5 outline-none"
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-blue-600 px-8 font-semibold text-white transition hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Current Location */}
<button
  onClick={handleCurrentLocation}
  className="mt-5 flex items-center gap-2 font-semibold text-blue-600 transition hover:text-blue-700"
>
  <MapPin size={18} />
  Use Current Location
</button>
          {/* Feature Pills */}
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
              <BedDouble className="text-blue-600" size={18} />
              <span>Live ICU Status</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
              <Wind className="text-teal-600" size={18} />
              <span>Oxygen Availability</span>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 shadow-sm">
              <HeartPulse className="text-red-500" size={18} />
              <span>Emergency Support</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex w-full justify-center lg:w-1/2">
          <img
            src={heroIllustration}
            alt="MediBridge Illustration"
            className="w-[90%] max-w-lg object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;