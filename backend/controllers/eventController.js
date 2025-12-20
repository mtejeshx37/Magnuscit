const Event = require('../models/Event');

// @desc    Fetch all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findOne({ id: req.params.id });
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getEvents,
    getEventById,
};
