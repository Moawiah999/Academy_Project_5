const express = require("express");
const { createTourPackages, getAllTourPakages,updateTourPackage,deletedById } = require("../controllers/tourPackages");
const {authentication}  = require("../middlewares/authentication");
const {authorization}  = require("../middlewares/authorization");

const tour_packagesRouter = express.Router();



tour_packagesRouter.post("/createTour",authentication,authorization("create package"),createTourPackages);
tour_packagesRouter.put("/update/:tour_packages_id",authentication,authorization("Update package"),updateTourPackage);

tour_packagesRouter.get("/all", getAllTourPakages);
tour_packagesRouter.delete("/tour/:tour_packages_id",authentication,authorization("Delete package"),deletedById);

module.exports = tour_packagesRouter;
