const express = require("express");

const userRouter = express.Router();
const {
  register,
  login,
  getUserInfoById,
  getAllUsers,
} = require("../controllers/users");
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/:id", getUserInfoById);
userRouter.get("/", getAllUsers);

module.exports = userRouter;
