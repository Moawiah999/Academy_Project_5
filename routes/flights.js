const express = require("express");

const { createFlights } = require("../controllers/flights");
const { authentication } = require("../middlewares/authentication");
const flightsRouter = express.Router();
flightsRouter.post("/",  createFlights);
module.exports = flightsRouter;
