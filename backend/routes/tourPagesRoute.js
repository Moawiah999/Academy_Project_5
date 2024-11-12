const express = require("express");

const tour_packagesRouter = express.Router();

const {
  createTourPackages,
  getAllTourPakages,
  deletedById,
} = require("../controllers/tourPackages");

tour_packagesRouter.post("/createTour", createTourPackages);
tour_packagesRouter.get("/all", getAllTourPakages);
tour_packagesRouter.delete("/tour/:tour_packages_id", deletedById);

module.exports = tour_packagesRouter;
