const express = require("express");
const { createTourPackages, getAllTourPakages,updateTourPackage,deletedById } = require("../controllers/tourPackages");
const {authentication}  = require("../middlewares/authentication");
const authorization  = require("../middlewares/authorization");

const tour_packagesRouter = express.Router();



tour_packagesRouter.post("/createTour",authentication,createTourPackages);
tour_packagesRouter.put("/update/:tour_packages_id",authentication,updateTourPackage);

tour_packagesRouter.get("/all", getAllTourPakages);
tour_packagesRouter.delete("/tour/:tour_packages_id",authentication, deletedById);

module.exports = tour_packagesRouter;
