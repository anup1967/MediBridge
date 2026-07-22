import { MapPin, PhoneCall } from "lucide-react";

function EmergencyButtons() {
  return (
    <section className="bg-white py-6">

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-4">

        <button className="flex justify-center items-center gap-2 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition">
          <MapPin />
          Detect My Location
        </button>

        <button className="flex justify-center items-center gap-2 bg-red-600 text-white py-4 rounded-xl hover:bg-red-700 transition">
          <PhoneCall />
          Call Emergency
        </button>

      </div>

    </section>
  );
}

export default EmergencyButtons;