import { useEffect, useState } from "react";
import api from "../api/api";

export default function useHospitalData() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHospitals = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/hospitals");

      setHospitals(data.data || []);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Failed to fetch hospitals."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  return {
    hospitals,
    loading,
    error,
    refresh: loadHospitals,
  };
}