const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/Seat');

router.get('/getSeatMatch', SeatController.checkSeat);

module.exports = router;