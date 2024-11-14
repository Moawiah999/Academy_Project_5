const express = require("express");

const reservationsRoute = express.Router();


const {getReservationsById} = require('../controllers/reservations');

reservationsRoute.get('/allReservations/:user_id',getReservationsById);

module.exports = reservationsRoute;