import EmergencyRequest from "../models/EmergencyRequest.js";
import Hospital from "../models/Hospital.js";

// Create Emergency Request
export const createEmergency = async (req, res) => {
  try {
    const {
      patientName,
      phone,
      emergencyType,
      hospitalId,
      message,
    } = req.body;

    if (!patientName || !phone || !emergencyType || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found.",
      });
    }

    const emergency = await EmergencyRequest.create({
      patientName,
      phone,
      emergencyType,
      hospitalId,
      message,
      status: "Pending",
    });

    const populated = await EmergencyRequest.findById(emergency._id)
      .populate("hospitalId");

    res.status(201).json({
      success: true,
      message: "Emergency request submitted successfully.",
      data: populated,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await EmergencyRequest.find()
      .populate("hospitalId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update Request Status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = [
      "Pending",
      "Accepted",
      "Rejected",
      "Completed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const request = await EmergencyRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("hospitalId");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Emergency request not found.",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully.",
      data: request,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};