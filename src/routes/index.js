const express = require('express');
const auth = require('./auth.js');
const ticket = require('./Ticket.js')
const seat = require('./Seat.js');
const router = express.Router();


const initRoutes = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/ticket', ticket);
  app.use('/api/seat', seat);
};

module.exports = initRoutes;
