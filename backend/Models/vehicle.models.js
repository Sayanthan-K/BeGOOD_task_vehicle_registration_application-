const mongoose = require("mongoose");

const vehicle_schema = new mongoose.Schema(
  {
    vehicle_number: {
      type: String,
      required: true,
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle", vehicle_schema);
