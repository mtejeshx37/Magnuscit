const express = require('express');
const router = express.Router();
const registerUser = require('../controllers/registrationController');

router.post('/', registerUser);

router.get('/', (req, res) => {
    res.json({ message: "Registration endpoint is active. Use POST to register a user." });
});

module.exports = router;
