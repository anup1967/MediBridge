import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Hospitals from "../pages/Hospitals";
import Emergency from "../pages/Emergency";
import HospitalDetails from "../pages/HospitalDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/hospitals" element={<Hospitals />} />

      <Route path="/hospital/:id" element={<HospitalDetails />} />

      <Route path="/emergency" element={<Emergency />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/about" element={<About />} />
      
<Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly>
    <Dashboard />
    </ProtectedRoute>
  }
/>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;