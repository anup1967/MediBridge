const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

email: {
  type: String,
  default: "",
  lowercase: true,
  trim: true,
},

website: {
  type: String,
  default: "",
  trim: true,
},

    image: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    departments: [
      {
        type: String,
      },
    ],

    coordinates: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },

    beds: {
      type: Number,
      default: 0,
    },

    oxygen: {
      type: Number,
      default: 0,
    },

    ventilators: {
      type: Number,
      default: 0,
    },

    waitingTime: {
      type: Number,
      default: 0,
    },

    ambulance: {
      type: Boolean,
      default: true,
    },

    emergency: {
      type: Boolean,
      default: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    reviewCount: {
      type: Number,
      default: 0,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hospital", hospitalSchema);