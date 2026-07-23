import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Building2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register(form);

      alert("Account created successfully.");

      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-5">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Join MediBridge
        </p>

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            required
          />

          <div>

            <label className="mb-3 block font-semibold">
              Register As
            </label>

            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role: "user",
                  })
                }
                className={`rounded-2xl border p-5 transition ${
                  form.role === "user"
                    ? "border-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                <User className="mx-auto mb-2" />

                User
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    role: "hospital",
                  })
                }
                className={`rounded-2xl border p-5 transition ${
                  form.role === "hospital"
                    ? "border-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                <Building2 className="mx-auto mb-2" />

                Hospital
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="mt-6 text-center">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 font-semibold text-blue-600"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}