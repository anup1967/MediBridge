const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const userRoutes = require("./routes/userRoutes");

// 👇 ADD THESE 4 LINES HERE
console.log("authRoutes =", authRoutes);
console.log("userRoutes =", userRoutes);
console.log("hospitalRoutes =", hospitalRoutes);
console.log("emergencyRoutes =", emergencyRoutes);

const app = express();
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
connectDB();

app.use(cors());
app.use(express.json());

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