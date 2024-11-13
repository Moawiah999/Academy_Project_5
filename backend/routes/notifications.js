const express = require("express");
const { createNotification } = require("../controllers/notifications");
const notificationRouter = express.Router();

notificationRouter.post("/", createNotification);

module.exports = notificationRouter;