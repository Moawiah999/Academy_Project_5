const express = require("express");

const reservationsRoute = express.Router();
const { authentication } = require("../middlewares/authentication");
const {
  getReservationsById,
  updateReservation,
  createReservation,
} = require("../controllers/reservations");

reservationsRoute.get("/allReservations/:user_id", getReservationsById);
reservationsRoute.post("/", authentication, createReservation);
reservationsRoute.put("/", authentication, updateReservation);

module.exports = reservationsRoute;
