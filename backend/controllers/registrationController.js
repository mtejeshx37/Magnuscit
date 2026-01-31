const Registration = require('../models/Registration');

// @desc    Register user from Google Form
// @route   POST /api/registrations
// @access  Public
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      college,
      eventId,
      eventName
    } = req.body;

    if (!name || !email || !eventId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const registration = await Registration.create({
      name,
      email,
      college,
      eventId,
      eventName,

      // flags for later (local processing)
      qrGenerated: false,
      odGenerated: false,
      emailSent: false,

      source: 'google-form'
    });

    res.status(201).json({
      success: true,
      id: registration._id
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = registerUser;
