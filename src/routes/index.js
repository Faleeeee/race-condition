const express = require('express');
const auth = require('./auth.js');
const ticket = require('./Ticket.js')

const router = express.Router();


const initRoutes = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/ticket', ticket);
};

module.exports = initRoutes;
