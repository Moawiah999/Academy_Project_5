const express = require("express");
const { createHotel, getAllHotels } = require("../controllers/hotels");
const hotelsRouter = express.Router();

hotelsRouter.post("/", createHotel);
hotelsRouter.get("/", getAllHotels);

module.exports = hotelsRouter;
