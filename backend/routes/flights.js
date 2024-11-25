const express = require("express");

const {
  createFlights,
  bookFlight,
  findAtrip,
  cancelFlight,
  getAllFlight,
  deleteFlights,
  updateFlight,
} = require("../controllers/flights");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const flightsRouter = express.Router();
flightsRouter.get("/", getAllFlight);
flightsRouter.post(
  "/",
  authentication,
  authorization("createFlights"),
  createFlights
);
flightsRouter.post("/bookFlight", authentication, bookFlight);
flightsRouter.get("/findAtrip", findAtrip);
flightsRouter.delete("/cancelFlight", authentication, cancelFlight);
flightsRouter.delete("/deleteFlights", deleteFlights);
flightsRouter.put("/updateFlight/:idFlights", updateFlight);
module.exports = flightsRouter;
