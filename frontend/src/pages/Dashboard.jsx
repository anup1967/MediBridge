import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  BedDouble,
  Wind,
  Activity,
  Ambulance,
  Search,
} from "lucide-react";

import useHospitalData from "../hooks/useHospitalData";
import api from "../api/api";

function Dashboard() {
  const { hospitals, loading } = useHospitalData();

  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((r) =>
      (r.patientName || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [requests, search]);

  const loadRequests = async () => {
    try {
      const { data } = await api.get("/emergency");
      setRequests(data.data || []);
    } catch (err) {
      console.error("Failed to load requests:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/emergency/${id}`, {
        status,
      });

      await loadRequests();
    } catch (err) {
      console.error("Failed to update request status:", err);
    }
  };

useEffect(() => {
  async function fetchRequests() {
    try {
      const { data } = await api.get("/emergency");
      setRequests(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  fetchRequests();

  const interval = setInterval(fetchRequests, 5000);

  return () => clearInterval(interval);
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Hospitals",
      value: hospitals.length,
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Beds",
      value: hospitals.reduce((s, h) => s + (h.beds || 0), 0),
      icon: BedDouble,
      color: "text-purple-600",
    },
    {
      title: "Oxygen",
      value: hospitals.reduce((s, h) => s + (h.oxygen || 0), 0),
      icon: Wind,
      color: "text-cyan-600",
    },
    {
      title: "Ventilators",
      value: hospitals.reduce((s, h) => s + (h.ventilators || 0), 0),
      icon: Activity,
      color: "text-orange-600",
    },
    {
      title: "Emergency Open",
      value: hospitals.filter((h) => h.emergency).length,
      icon: Ambulance,
      color: "text-red-600",
    },
  ];

  const badge = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              MediBridge Dashboard
            </h1>

            <p className="mt-2 text-gray-600">
              Live overview of hospitals and emergency requests.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-6 shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">
                      {item.title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                      {item.value}
                    </h2>
                  </div>

                  <Icon
                    size={30}
                    className={item.color}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white shadow">
          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">
              Emergency Requests
            </h2>

            <p className="mt-2 text-gray-500">
              Manage incoming emergency requests.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Patient
                  </th>

                  <th className="px-6 py-4 text-left">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left">
                    Condition
                  </th>

                  <th className="px-6 py-4 text-left">
                    Hospital
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500"
                    >
                      No emergency requests found.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="border-t hover:bg-slate-50"
                    >
                      <td className="px-6 py-5 font-semibold">
                        {request.patientName}
                      </td>

                      <td className="px-6 py-5">
                        {request.phone}
                      </td>

                      <td className="px-6 py-5">
                        {request.emergencyType}
                      </td>

                      <td className="px-6 py-5">
                        {request.hospitalId?.name || "-"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            badge[request.status] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button
                            disabled={
                              request.status !== "Pending"
                            }
                            onClick={() =>
                              updateStatus(
                                request._id,
                                "Accepted"
                              )
                            }
                            className={`rounded-lg px-4 py-2 text-white transition ${
                              request.status === "Pending"
                                ? "bg-green-600 hover:bg-green-700"
                                : "cursor-not-allowed bg-gray-400"
                            }`}
                          >
                            Accept
                          </button>

                          <button
                            disabled={
                              request.status !== "Pending"
                            }
                            onClick={() =>
                              updateStatus(
                                request._id,
                                "Rejected"
                              )
                            }
                            className={`rounded-lg px-4 py-2 text-white transition ${
                              request.status === "Pending"
                                ? "bg-red-600 hover:bg-red-700"
                                : "cursor-not-allowed bg-gray-400"
                            }`}
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;