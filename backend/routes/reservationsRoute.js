const express = require("express");

const reservationsRoute = express.Router();
const { authentication } = require("../middlewares/authentication");
const {
  getReservationsById,
  updateReservation,
  createFlightsReservation,
  createHotelsReservation,
} = require("../controllers/reservations");

reservationsRoute.get("/allReservations/",authentication,getReservationsById);
reservationsRoute.post(
  "/reservationFlight",
  authentication,
  createFlightsReservation
);
reservationsRoute.post(
  "/reservationHotel",
  authentication,
  createHotelsReservation
);
reservationsRoute.put("/", authentication, updateReservation);

module.exports = reservationsRoute;
