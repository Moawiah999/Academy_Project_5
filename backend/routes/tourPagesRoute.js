const express = require("express");
const { createTourPackages, getAllTourPakages, deletedById } = require("../controllers/tourPackages");

const tour_packagesRouter = express.Router();





tour_packagesRouter.post("/createTour", createTourPackages);
tour_packagesRouter.get("/all", getAllTourPakages);
tour_packagesRouter.delete("/tour/:tour_packages_id", deletedById);



module.exports = tour_packagesRouter;