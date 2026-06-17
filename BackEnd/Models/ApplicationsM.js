const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
        trim: true,
        lowercase: true,
    },

    phone: {
      type: String,
      required: true,
         trim: true,
    },

    applicationType: {
      type: String,
      required: true,
    },

    currentZoning: {
      type: String,
      required: true,
    },

    propertyDescription: {
      type: String,
      required: true,
      trim: true,
    },

    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    sitePlan: {
  type: String,
},

gisAerial: {
  type: String,
},

supportingDocument: {
  type: String,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);