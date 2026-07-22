const Hospital = require("../models/Hospital");

// Get all hospitals
exports.getHospitals = async (req, res) => {
  try {
    const {
      city,
      state,
      emergency,
      verified,
      search,
    } = req.query;

    const filter = {};

    if (city) filter.city = new RegExp(city, "i");
    if (state) filter.state = new RegExp(state, "i");

    if (verified !== undefined)
      filter.verified = verified === "true";

    if (emergency !== undefined)
      filter.emergency = emergency === "true";

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { city: new RegExp(search, "i") },
        { state: new RegExp(search, "i") },
      ];
    }

    const hospitals = await Hospital.find(filter).sort({
      verified: -1,
      updatedAt: -1,
    });

    res.json({
      success: true,
      count: hospitals.length,
      data: hospitals,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get one hospital
exports.getHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.json({
      success: true,
      data: hospital,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create hospital
exports.createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      message: "Hospital created successfully.",
      data: hospital,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update hospital
exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      {
        new: true,
        runValidators: false,
      }
    );

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.json({
      success: true,
      message: "Hospital updated successfully.",
      data: hospital,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndDelete(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    res.json({
      success: true,
      message: "Hospital deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update live resources
exports.updateResources = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    if (req.body.beds !== undefined)
      hospital.beds = req.body.beds;

    if (req.body.oxygen !== undefined)
      hospital.oxygen = req.body.oxygen;

    if (req.body.ventilators !== undefined)
      hospital.ventilators = req.body.ventilators;

    if (req.body.waitingTime !== undefined)
      hospital.waitingTime = req.body.waitingTime;

    if (req.body.emergency !== undefined)
      hospital.emergency = req.body.emergency;

    if (req.body.ambulance !== undefined)
      hospital.ambulance = req.body.ambulance;

    if (req.user)
      hospital.updatedBy = req.user._id;

    await hospital.save();

    res.json({
      success: true,
      message: "Resources updated successfully.",
      data: hospital,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};