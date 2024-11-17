const express = require("express");
const {
  createHotel,
  getAllHotels,
  updateHotelById,
  deleteHotelById,
  getHotelById,
  getBestHotels,
} = require("../controllers/hotels");
const hotelsRouter = express.Router();

hotelsRouter.post("/", createHotel);
hotelsRouter.get("/", getAllHotels);
hotelsRouter.put("/:id", updateHotelById);
hotelsRouter.delete("/:id", deleteHotelById);
hotelsRouter.get("/:id", getHotelById);
hotelsRouter.get("/bestHotel/best", getBestHotels)

module.exports = hotelsRouter;
