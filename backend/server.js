import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import hospitalRoutes from "./routes/hospitalRoutes.js";
import emergencyRoutes from "./routes/emergencyRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/hospitals", express.static("uploads/hospitals"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/emergency", emergencyRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 MediBridge Backend Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});