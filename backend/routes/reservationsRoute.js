const express = require("express");

const reservationsRoute = express.Router();
const { authentication } = require("../middlewares/authentication");
const {
  getReservationsById,
  updateReservation,
  createFlightsReservation,
} = require("../controllers/reservations");

reservationsRoute.get("/allReservations/:user_id", getReservationsById);
reservationsRoute.post(
  "/reservationFlight",
  authentication,
  createFlightsReservation
);
reservationsRoute.put("/", authentication, updateReservation);

module.exports = reservationsRoute;
