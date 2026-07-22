import { HeartPulse } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">

        <div>

          <div className="flex items-center gap-2 text-2xl font-bold">

            <HeartPulse className="text-red-500" />

            MediBridge

          </div>

          <p className="text-gray-400 mt-4">
            Connecting people with nearby hospitals and emergency
            healthcare resources when every second matters.
          </p>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>Home</li>
            <li>Hospitals</li>
            <li>Emergency</li>
            <li>Dashboard</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Emergency
          </h3>

          <ul className="space-y-2 text-gray-400">

            <li>Ambulance : 108</li>
            <li>Police : 100</li>
            <li>Fire : 101</li>

          </ul>

        </div>

        <div>

          <h3 className="font-semibold mb-4">
            Contact
          </h3>

          <p className="text-gray-400">
            support@medibridge.com
          </p>

          <p className="text-gray-400 mt-2">
            Mumbai, India
          </p>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6 text-center text-gray-400">

        © 2026 MediBridge. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;