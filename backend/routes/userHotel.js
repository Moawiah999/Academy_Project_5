const express = require("express");
const { authentication } = require("../middlewares/authentication");
const { reserveHotelById } = require("../controllers/userHotel");
const userHotelRouter = express.Router();

userHotelRouter.post("/:id", authentication, reserveHotelById);

module.exports = userHotelRouter;
