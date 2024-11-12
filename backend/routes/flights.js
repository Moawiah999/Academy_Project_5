const express = require("express");

const { createFlights, bookFlight,findAtrip } = require("../controllers/flights");
const { authentication } = require("../middlewares/authentication");
const flightsRouter = express.Router();
flightsRouter.post("/", createFlights);
flightsRouter.post("/bookFlight", bookFlight);
flightsRouter.post("/findAtrip", findAtrip);
module.exports = flightsRouter;
