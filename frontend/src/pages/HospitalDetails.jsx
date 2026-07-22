import { useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Bed,
  Wind,
  Activity,
  Ambulance,
} from "lucide-react";

import Navbar from "../components/Navbar";
import useHospitalData from "../hooks/useHospitalData";

export default function HospitalDetails() {
  const { id } = useParams();

  const {
    hospitals,
    loading,
    error,
  } = useHospitalData();

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <h1 className="text-3xl font-bold">
            Loading Hospital...
          </h1>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <h1 className="text-2xl font-bold text-red-600">
            {error}
          </h1>
        </div>
      </>
    );
  }

const hospital = hospitals.find(
  (h) => String(h._id) === String(id)
);
{hospital.website && (
  <a
    href={hospital.website}
    target="_blank"
    rel="noreferrer"
    className="mb-4 block rounded-xl bg-slate-700 py-4 text-center font-semibold text-white transition hover:bg-slate-800"
  >
    Visit Website
  </a>
)}
  if (!hospital) {
    return (
      <>
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center">
          <h1 className="text-3xl font-bold">
            Hospital Not Found
          </h1>
        </div>
      </>
    );
  }

  const statusColor = (value) => {
    if (value <= 5) return "text-red-600";
    if (value <= 15) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">

          <div className="mx-auto max-w-7xl px-6 py-16">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h1 className="text-5xl font-bold">
                  {hospital.name}
                </h1>

                <div className="mt-4 flex items-center gap-2">
                  <MapPin size={20} />
                  <span>
                    {hospital.address}, {hospital.city}, {hospital.state}
                  </span>
                </div>

              </div>

              <div>

                <span
                  className={`rounded-full px-5 py-3 font-semibold ${
                    hospital.emergency
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {hospital.emergency
                    ? "Emergency Available"
                    : "Emergency Busy"}
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="grid gap-8 lg:grid-cols-3">

            <div className="space-y-6 lg:col-span-2">

              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="mb-5 text-2xl font-bold">
                  Contact Information
                </h2>

                <div className="space-y-5">

                  <div className="flex items-center gap-3">
                    <Phone />
                    {hospital.phone}
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail />
                    {hospital.email || "Not Available"}
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin />
                    {hospital.address}
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock />
                    Last Updated :
                    {" "}
                    {hospital.updatedAt
                      ? new Date(hospital.updatedAt).toLocaleString()
                      : "Not Available"}
                  </div>

                </div>

              </div>
              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="mb-6 text-2xl font-bold">
                  Live Resource Availability
                </h2>

                <div className="space-y-6">

                  <div>

                    <div className="flex justify-between">

                      <span className="flex items-center gap-2">
                        <Bed size={18} />
                        Available Beds
                      </span>

                      <span
                        className={`font-bold ${statusColor(
                          Number(hospital.beds) || 0
                        )}`}
                      >
                        {hospital.beds || 0}
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-gray-200">

                      <div
                        className="h-2 rounded-full bg-green-600"
                        style={{
                          width: `${Math.min(
                            (Number(hospital.beds) || 0) * 5,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between">

                      <span className="flex items-center gap-2">
                        <Wind size={18} />
                        Oxygen Units
                      </span>

                      <span
                        className={`font-bold ${statusColor(
                          Number(hospital.oxygen) || 0
                        )}`}
                      >
                        {hospital.oxygen || 0}
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-gray-200">

                      <div
                        className="h-2 rounded-full bg-cyan-500"
                        style={{
                          width: `${Math.min(
                            (Number(hospital.oxygen) || 0) * 3,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between">

                      <span className="flex items-center gap-2">
                        <Activity size={18} />
                        Ventilators
                      </span>

                      <span
                        className={`font-bold ${statusColor(
                          Number(hospital.ventilators) || 0
                        )}`}
                      >
                        {hospital.ventilators || 0}
                      </span>

                    </div>

                    <div className="mt-2 h-2 rounded-full bg-gray-200">

                      <div
                        className="h-2 rounded-full bg-orange-500"
                        style={{
                          width: `${Math.min(
                            (Number(hospital.ventilators) || 0) * 10,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between">

                      <span className="flex items-center gap-2">
                        <Ambulance size={18} />
                        Ambulance
                      </span>

                      <span
                        className={`font-semibold ${
                          hospital.ambulance
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {hospital.ambulance
                          ? "Available"
                          : "Busy"}
                      </span>

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between">

                      <span>Waiting Time</span>

                      <span className="font-semibold text-blue-600">
                        {hospital.waitingTime ?? 0} min
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>
                        <div className="space-y-6">

              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="mb-5 text-xl font-bold">
                  Quick Actions
                </h2>

                <a
                  href={`tel:${hospital.phone}`}
                  className="mb-4 block rounded-xl bg-green-600 py-4 text-center font-semibold text-white transition hover:bg-green-700"
                >
                  Call Hospital
                </a>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${hospital.address}, ${hospital.city}, ${hospital.state}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl bg-blue-600 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
                >
                  Open in Google Maps
                </a>

              </div>

              <div className="rounded-2xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-bold">
                  Hospital Status
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span>Emergency</span>

                    <span
                      className={
                        hospital.emergency
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {hospital.emergency ? "OPEN" : "BUSY"}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Ambulance</span>

                    <span
                      className={
                        hospital.ambulance
                          ? "font-semibold text-green-600"
                          : "font-semibold text-red-600"
                      }
                    >
                      {hospital.ambulance
                        ? "AVAILABLE"
                        : "UNAVAILABLE"}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Available Beds</span>

                    <span className="font-semibold text-blue-600">
                      {hospital.beds || 0}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Oxygen Units</span>

                    <span className="font-semibold text-cyan-600">
                      {hospital.oxygen || 0}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Ventilators</span>

                    <span className="font-semibold text-orange-600">
                      {hospital.ventilators || 0}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Waiting Time</span>

                    <span className="font-semibold">
                      {hospital.waitingTime ?? 0} min
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span>Verified</span>

                    <span
                      className={
                        hospital.verified
                          ? "font-semibold text-green-600"
                          : "font-semibold text-orange-600"
                      }
                    >
                      {hospital.verified ? "YES" : "NO"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}              