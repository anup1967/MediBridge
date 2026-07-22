import {
  Search,
  Activity,
  Navigation,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search Hospitals",
    description:
      "Search nearby hospitals using your current location or a specific area.",
  },
  {
    icon: Activity,
    title: "Check Live Resources",
    description:
      "View ICU beds, oxygen units, ventilators and emergency availability.",
  },
  {
    icon: Navigation,
    title: "Navigate or Call",
    description:
      "Get directions instantly or contact the hospital in one tap.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            How MediBridge Works
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Find emergency healthcare resources in three simple steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>

                {index !== steps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-5 top-1/2 hidden -translate-y-1/2 text-slate-300 lg:block"
                    size={32}
                  />
                )}
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;