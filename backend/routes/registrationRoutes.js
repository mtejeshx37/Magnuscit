const express = require('express');
const router = express.Router();
const { registerUser, sendBulkEmails } = require('../controllers/registrationController');

router.post('/', registerUser);
router.post('/bulk-send', sendBulkEmails);

router.get('/', (req, res) => {
    res.json({ message: "Registration endpoint is active. Use POST to register a user." });
});

module.exports = router;
