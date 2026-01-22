const express = require('express');
const router = express.Router();
const { getEvents, getEventById } = require('../controllers/eventController');

router.route('/').get(getEvents);
router.route('/:id').get(getEventById);

module.exports = router;
