const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/Ticket')

router.post('/bookTicket', TicketController.bookTicket);

module.exports = router;