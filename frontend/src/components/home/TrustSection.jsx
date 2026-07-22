import { Search, MapPinned, Activity } from "lucide-react";

function TrustSection() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* Left */}

          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-widest">
              Why MediBridge
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
              Healthcare,
              <br />
              made simpler.
            </h2>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              Finding emergency care shouldn't mean calling multiple
              hospitals or driving without knowing availability.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              MediBridge helps people locate nearby hospitals,
              compare emergency resources, and make informed
              decisions during critical moments.
            </p>

          </div>

          {/* Right */}

          <div className="grid gap-6">

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <Search className="text-blue-600" size={36} />
              <h3 className="mt-5 text-xl font-semibold">
                Fast Search
              </h3>
              <p className="mt-3 text-slate-600">
                Locate nearby hospitals within seconds.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <MapPinned className="text-teal-600" size={36} />
              <h3 className="mt-5 text-xl font-semibold">
                Live Location
              </h3>
              <p className="mt-3 text-slate-600">
                Discover hospitals close to your current location.
              </p>
            </div>

            <div className="rounded-3xl bg-slate-50 p-8 shadow-sm">
              <Activity className="text-red-500" size={36} />
              <h3 className="mt-5 text-xl font-semibold">
                Resource Status
              </h3>
              <p className="mt-3 text-slate-600">
                View ICU beds, oxygen availability and ventilators.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default TrustSection;