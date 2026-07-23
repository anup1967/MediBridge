import mongoose from "mongoose";

const emergencyRequestSchema = new mongoose.Schema(
  {
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },

    patientName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    emergencyType: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Rejected",
        "Completed",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "EmergencyRequest",
  emergencyRequestSchema
);