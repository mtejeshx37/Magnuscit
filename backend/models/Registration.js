const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: { type: String, required: true },

  college: String,
  eventName: String,

  // generated later
  qrData: { type: String, default: null },

  qrGenerated: { type: Boolean, default: false },
  odGenerated: { type: Boolean, default: false },
  emailSent: { type: Boolean, default: false },

  source: { type: String, default: "google-form" }
}, { timestamps: true });

module.exports =
  mongoose.models.Registration ||
  mongoose.model("Registration", registrationSchema);
