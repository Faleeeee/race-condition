const express = require('express');
const router = express.Router();
const SeatController = require('../controllers/Seat');

router.get('/getSeatMatch/:match_id', SeatController.checkSeat);

module.exports = router;