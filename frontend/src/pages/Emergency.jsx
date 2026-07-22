import {
  Phone,
  Ambulance,
  HeartPulse,
  Building2,
  ShieldAlert,
  MapPin,
  Clock,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useHospitalData from "../hooks/useHospitalData";
import api from "../api/api";
import toast from "react-hot-toast";

function Emergency() {
  const { hospitals, loading } = useHospitalData();

  const [selectedHospital, setSelectedHospital] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [condition, setCondition] = useState("");
  const [sending, setSending] = useState(false);

  const emergencyHospitals = hospitals.filter(
    (h) => h.emergency
  );

  const submitEmergency = async () => {
    if (
      !selectedHospital ||
      !patientName ||
      !phone ||
      !condition
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      setSending(true);

      await api.post("/emergency", {
        hospitalId: selectedHospital,
        patientName,
        phone,
        emergencyType: condition,
      });

      toast.success(
        "Emergency request submitted successfully."
      );

      setPatientName("");
      setPhone("");
      setCondition("");
      setSelectedHospital("");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to send request."
      );
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Emergency Services...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-red-600 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4">
              <ShieldAlert size={42} />
            </div>

            <div>
              <h1 className="text-5xl font-bold">
                Emergency Assistance
              </h1>

              <p className="mt-3 text-lg text-red-100">
                Find emergency hospitals, ambulance services and
                essential emergency numbers instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="my-10 rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-3xl font-bold">
            Request Emergency Admission
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              className="rounded-xl border p-3"
              placeholder="Patient Name"
              value={patientName}
              onChange={(e) =>
                setPatientName(e.target.value)
              }
            />

            <input
              className="rounded-xl border p-3"
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <select
              className="rounded-xl border p-3"
              value={selectedHospital}
              onChange={(e) =>
                setSelectedHospital(e.target.value)
              }
            >
              <option value="">
                Select Hospital
              </option>

              {emergencyHospitals.map((h) => (
                <option
                  key={h._id}
                  value={h._id}
                >
                  {h.name}
                </option>
              ))}
            </select>

            <input
              className="rounded-xl border p-3"
              placeholder="Condition"
              value={condition}
              onChange={(e) =>
                setCondition(e.target.value)
              }
            />
          </div>

          <button
            onClick={submitEmergency}
            disabled={sending}
            className={`mt-6 w-full rounded-xl py-4 font-bold text-white transition ${
              sending
                ? "cursor-not-allowed bg-red-400"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {sending
              ? "Submitting..."
              : "Request Emergency Admission"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="tel:108"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-xl"
          >
            <Ambulance
              className="mb-4 text-red-600"
              size={40}
            />

            <h2 className="text-xl font-bold">
              Ambulance
            </h2>

            <p className="mt-2 text-gray-600">
              National Emergency Ambulance
            </p>

            <div className="mt-6 text-3xl font-bold text-red-600">
              108
            </div>
          </a>

          <a
            href="tel:102"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-xl"
          >
            <HeartPulse
              className="mb-4 text-green-600"
              size={40}
            />

            <h2 className="text-xl font-bold">
              Medical Helpline
            </h2>

            <p className="mt-2 text-gray-600">
              Emergency Medical Support
            </p>

            <div className="mt-6 text-3xl font-bold text-green-600">
              102
            </div>
          </a>

          <a
            href="tel:112"
            className="rounded-2xl bg-white p-6 shadow transition hover:shadow-xl"
          >
            <Phone
              className="mb-4 text-blue-600"
              size={40}
            />

            <h2 className="text-xl font-bold">
              National Helpline
            </h2>

            <p className="mt-2 text-gray-600">
              Emergency Response
            </p>

            <div className="mt-6 text-3xl font-bold text-blue-600">
              112
            </div>
          </a>
        </div>

        <div className="mt-14">
          <h2 className="mb-8 text-3xl font-bold">
            Emergency Hospitals
          </h2>

          {emergencyHospitals.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
              <h3 className="text-2xl font-bold">
                No hospitals are currently accepting emergency
                admissions.
              </h3>

              <p className="mt-3 text-gray-600">
                Please call 108 or 112 for immediate assistance.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {emergencyHospitals.map((hospital) => (
                <div
                  key={hospital._id}
                  className="rounded-2xl bg-white p-6 shadow"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {hospital.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        {hospital.address}
                      </div>
                    </div>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                      OPEN
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-4">
                    <div className="rounded-xl bg-slate-100 p-4 text-center">
                      <Building2 className="mx-auto mb-2 text-blue-600" />
                      <p className="text-sm text-gray-500">
                        Beds
                      </p>
                      <p className="text-xl font-bold">
                        {hospital.beds}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4 text-center">
                      <HeartPulse className="mx-auto mb-2 text-green-600" />
                      <p className="text-sm text-gray-500">
                        Oxygen
                      </p>
                      <p className="text-xl font-bold">
                        {hospital.oxygen}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4 text-center">
                      <Activity className="mx-auto mb-2 text-orange-600" />
                      <p className="text-sm text-gray-500">
                        Ventilators
                      </p>
                      <p className="text-xl font-bold">
                        {hospital.ventilators}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-100 p-4 text-center">
                      <Clock className="mx-auto mb-2 text-purple-600" />
                      <p className="text-sm text-gray-500">
                        Wait
                      </p>
                      <p className="text-xl font-bold">
                        {hospital.waitingTime} min
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={`tel:${hospital.phone}`}
                      className="flex-1 rounded-xl bg-emerald-600 py-3 text-center font-semibold text-white hover:bg-emerald-700"
                    >
                      Call
                    </a>

                    <Link
                      to={`/hospital/${hospital._id}`}
                      className="flex-1 rounded-xl border border-slate-300 py-3 text-center font-semibold hover:bg-slate-100"
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Emergency;