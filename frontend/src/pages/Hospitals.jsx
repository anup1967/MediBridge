import { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "../components/Navbar";
import HospitalCard from "../components/home/HospitalCard";
import HospitalMap from "../components/home/HospitalMap";
import useHospitalData from "../hooks/useHospitalData";

export default function Hospitals() {
  const {
    hospitals = [],
    loading,
    error,
  } = useHospitalData();

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const [filters, setFilters] = useState({
    emergency: false,
    ambulance: false,
    icu: false,
    oxygen: false,
    ventilator: false,
  });
    const cities = [
    "All",
    ...new Set(hospitals.map((hospital) => hospital.city)),
  ];

  const filteredHospitals = useMemo(() => {
    let data = [...hospitals];

    data = data.filter((hospital) => {
      const query = search.toLowerCase();

      const matchesSearch =
        (hospital.name || "")
          .toLowerCase()
          .includes(query) ||
        (hospital.city || "")
          .toLowerCase()
          .includes(query) ||
        hospital.departments?.some((department) =>
          department.toLowerCase().includes(query)
        );

      const matchesCity =
        city === "All" || hospital.city === city;

      const matchesEmergency =
        !filters.emergency || hospital.emergency;

      const matchesAmbulance =
        !filters.ambulance || hospital.ambulance;

      const matchesICU =
        !filters.icu || hospital.beds > 0;

      const matchesOxygen =
        !filters.oxygen || hospital.oxygen > 0;

      const matchesVentilator =
        !filters.ventilator ||
        hospital.ventilators > 0;

      return (
        matchesSearch &&
        matchesCity &&
        matchesEmergency &&
        matchesAmbulance &&
        matchesICU &&
        matchesOxygen &&
        matchesVentilator
      );
    });

    switch (sortBy) {
      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "beds":
        data.sort((a, b) => b.beds - a.beds);
        break;

      case "waiting":
        data.sort(
          (a, b) => a.waitingTime - b.waitingTime
        );
        break;

      case "oxygen":
        data.sort((a, b) => b.oxygen - a.oxygen);
        break;

      default:
        break;
    }

    return data;
  }, [search, city, filters, sortBy, hospitals]);

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
          Loading hospitals...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center text-xl font-bold text-red-600">
          {error}
        </div>
      </>
    );
  }

  return (
        <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <h1 className="mb-8 text-4xl font-bold">
            Find Nearby Hospitals
          </h1>

          <div className="mb-8 rounded-2xl bg-white p-5 shadow">
            <div className="relative">
              <Search
                className="absolute left-4 top-4 text-gray-500"
                size={20}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospital, city or department..."
                className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none focus:border-blue-500"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => toggleFilter("emergency")}
                className={`rounded-full px-5 py-2 ${
                  filters.emergency
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Emergency
              </button>

              <button
                onClick={() => toggleFilter("ambulance")}
                className={`rounded-full px-5 py-2 ${
                  filters.ambulance
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Ambulance
              </button>

              <button
                onClick={() => toggleFilter("icu")}
                className={`rounded-full px-5 py-2 ${
                  filters.icu
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                ICU
              </button>

              <button
                onClick={() => toggleFilter("oxygen")}
                className={`rounded-full px-5 py-2 ${
                  filters.oxygen
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Oxygen
              </button>

              <button
                onClick={() => toggleFilter("ventilator")}
                className={`rounded-full px-5 py-2 ${
                  filters.ventilator
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Ventilator
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="rounded-xl border bg-white px-4 py-3"
              >
                {cities.map((cityName) => (
                  <option
                    key={cityName}
                    value={cityName}
                  >
                    {cityName}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border bg-white px-4 py-3"
              >
                <option value="rating">
                  Highest Rating
                </option>

                <option value="beds">
                  ICU Beds
                </option>

                <option value="oxygen">
                  Oxygen
                </option>

                <option value="waiting">
                  Waiting Time
                </option>
              </select>
            </div>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <Filter size={18} />

            <span className="font-semibold">
              {filteredHospitals.length} Hospitals Found
            </span>
          </div>

          <div className="grid gap-8 xl:grid-cols-5">
            <div className="max-h-[700px] space-y-6 overflow-y-auto pr-2 xl:col-span-2">
              {filteredHospitals.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center shadow">
                  <h3 className="text-xl font-bold">
                    No hospitals found
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Try changing your filters or search terms.
                  </p>
                </div>
              ) : (
                filteredHospitals.map((hospital) => (
                  <HospitalCard
                    key={hospital._id}
                    hospital={hospital}
                  />
                ))
              )}
            </div>

            <div className="xl:col-span-3">
              <HospitalMap
                hospitals={filteredHospitals}
              />
            </div>
          </div>
        </div>
      </div>
          </>
  );
}