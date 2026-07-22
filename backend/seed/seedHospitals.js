const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("../config/db");
const Hospital = require("../models/Hospital");

const hospitals = require("./hospitalsData");

const seedHospitals = async () => {
  try {
    await connectDB();

    console.log("🗑 Clearing existing hospitals...");
    await Hospital.deleteMany();

    console.log("📥 Inserting hospitals...");
    await Hospital.insertMany(hospitals);

    console.log(`✅ ${hospitals.length} hospitals seeded successfully!`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed");
    console.error(err);
    process.exit(1);
  }
};

seedHospitals();