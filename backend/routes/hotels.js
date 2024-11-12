const express = require("express");
const { createHotel } = require("../controllers/hotels");
const hotelsRouter = express.Router();

hotelsRouter.post("/", createHotel);

module.exports = hotelsRouter;