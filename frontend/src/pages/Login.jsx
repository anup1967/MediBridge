import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [selectedRole, setSelectedRole] = useState("user");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const user = await login(
        formData.email,
        formData.password
      );

      // Prevent logging into the wrong portal
      if (user.role !== selectedRole) {
        setError(
          `This account belongs to the ${user.role} portal.`
        );
        return;
      }

      if (user.role === "hospital") {
        navigate("/hospital/dashboard");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-slate-100 px-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-slate-500">
          Sign in to continue to MediBridge
        </p>

        {/* Portal Selector */}

        <div className="mb-8 grid grid-cols-3 gap-3">

          <button
            type="button"
            onClick={() => setSelectedRole("user")}
            className={`rounded-2xl border p-4 transition ${
              selectedRole === "user"
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : ""
            }`}
          >
            <User className="mx-auto mb-2" />

            <span className="text-sm font-semibold">
              User
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("hospital")}
            className={`rounded-2xl border p-4 transition ${
              selectedRole === "hospital"
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : ""
            }`}
          >
            <Building2 className="mx-auto mb-2" />

            <span className="text-sm font-semibold">
              Hospital
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole("admin")}
            className={`rounded-2xl border p-4 transition ${
              selectedRole === "admin"
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : ""
            }`}
          >
            <ShieldCheck className="mx-auto mb-2" />

            <span className="text-sm font-semibold">
              Admin
            </span>
          </button>

        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border p-3 outline-none focus:border-blue-600"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-400"
          >
            {loading
              ? "Signing In..."
              : `Login as ${
                  selectedRole.charAt(0).toUpperCase() +
                  selectedRole.slice(1)
                }`}
          </button>

        </form>

        <p className="mt-6 text-center text-sm">

          Don't have an account?

          {selectedRole === "admin" ? (
            <span className="ml-2 font-semibold text-slate-500">
              Contact the administrator
            </span>
          ) : (
            <Link
              to="/register"
              className="ml-2 font-semibold text-blue-600"
            >
              Register
            </Link>
          )}

        </p>

      </div>
    </div>
  );
}