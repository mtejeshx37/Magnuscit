const mongoose = require('mongoose');

const registrationSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    eventId: { type: String, required: false },
    eventName: { type: String, required: false, default: 'MAGNUS 2026' },
    eventDate: { type: String, required: false, default: 'February 2nd, 2026' },
    qrData: { type: String, required: true },
    emailSent: { type: Boolean, default: false },
    odLetterSent: { type: Boolean, default: false }
}, {
    timestamps: true,
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
