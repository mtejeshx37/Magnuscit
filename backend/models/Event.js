const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    registrationRules: [{ type: String }],
    eventRules: [{ type: String }],
    contact: { type: String, required: true },
}, {
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
