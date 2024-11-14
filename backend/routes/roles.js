const express = require("express");

//create role Roter
const roleRouter = express.Router();

const {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
} = require("../controllers/roles");

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);
module.exports = roleRouter;
