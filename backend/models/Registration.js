const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    eventId: { type: String, required: false }, // Optional, to link to a specific event if needed
    qrData: { type: String, required: true },
    qrCodeUrl: { type: String }, // Optional: store the data URL if we want to save it directly
    emailSent: { type: Boolean, default: false }
}, {
    timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
