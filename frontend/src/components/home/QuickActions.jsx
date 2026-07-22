import { Link } from "react-router-dom";
import { PhoneCall, Building2, ArrowRight } from "lucide-react";

function QuickActions() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Access emergency healthcare services instantly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Emergency Card */}
          <Link
            to="/emergency"
            className="group rounded-3xl bg-gradient-to-br from-red-500 to-red-600 p-8 text-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <PhoneCall size={44} />

            <h3 className="mt-8 text-3xl font-bold">
              Emergency Call
            </h3>

            <p className="mt-4 text-red-100 leading-7">
              Need immediate medical assistance? Access emergency services
              with a single tap.
            </p>

            <div className="mt-10 flex items-center gap-2 font-semibold">
              Go to Emergency
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

          {/* Hospital Card */}
          <Link
            to="/hospitals"
            className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <Building2
              size={44}
              className="text-blue-600"
            />

            <h3 className="mt-8 text-3xl font-bold text-slate-900">
              Find Hospitals
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Search nearby hospitals and check real-time ICU beds,
              oxygen support, ventilators and emergency services.
            </p>

            <div className="mt-10 flex items-center gap-2 font-semibold text-blue-600">
              Browse Hospitals
              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

export default QuickActions;