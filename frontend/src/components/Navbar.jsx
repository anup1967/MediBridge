import { Link } from "react-router-dom";
import { Ambulance } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
            <Ambulance size={22} />
          </div>

          <span className="text-3xl font-extrabold text-slate-900">
            Medi<span className="text-blue-600">Bridge</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-[16px] font-medium text-slate-600 md:flex">
          <Link to="/" className="transition hover:text-blue-600">
            Home
          </Link>

          <Link to="/hospitals" className="transition hover:text-blue-600">
            Hospitals
          </Link>

          <Link to="/about" className="transition hover:text-blue-600">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="font-semibold text-slate-700 transition hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;