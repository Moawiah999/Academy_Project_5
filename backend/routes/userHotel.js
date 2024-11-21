const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { reserveHotelById, cancelHotel } = require("../controllers/userHotel");
const userHotelRouter = express.Router();

userHotelRouter.post("/:id", authentication, reserveHotelById);
userHotelRouter.delete("/:id", authentication, cancelHotel);

module.exports = userHotelRouter;
