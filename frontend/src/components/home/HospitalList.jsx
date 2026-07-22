import { Link } from "react-router-dom";
import HospitalCard from "./HospitalCard";
import useHospitalData from "../../hooks/useHospitalData";

function HospitalList() {
  const { hospitals, loading, error } = useHospitalData();

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading hospitals...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600">
        {error}
      </div>
    );
  }

  const featuredHospitals = hospitals.slice(0, 4);

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
              Nearby Healthcare
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Nearby Hospitals
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-slate-600">
              Browse hospitals with live availability of ICU beds, oxygen,
              ventilators and emergency services.
            </p>
          </div>

          <Link
            to="/hospitals"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View All Hospitals
          </Link>

        </div>

        {/* Stats */}
        <div className="mb-10 flex flex-wrap gap-4 text-sm">

          <div className="rounded-xl bg-white px-5 py-3 shadow">
            🏥 {hospitals.length} Hospitals
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow">
            🚑 {hospitals.filter((h) => h.emergency).length} Emergency Available
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow">
            🚓 {hospitals.filter((h) => h.ambulance).length} Ambulances Ready
          </div>

        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">

          {featuredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital._id}
              hospital={hospital}
            />
          ))}

        </div>

      </div>
    </section>
  );
}

export default HospitalList;