const express = require("express");

const {
  createFlights,
  bookFlight,
  findAtrip,
  cancelFlight,
} = require("../controllers/flights");
const { authentication } = require("../middlewares/authentication");
const flightsRouter = express.Router();
flightsRouter.post("/", createFlights);
flightsRouter.post("/bookFlight", bookFlight);
flightsRouter.post("/findAtrip", findAtrip);
flightsRouter.delete("/cancelFlight", cancelFlight);
module.exports = flightsRouter;
