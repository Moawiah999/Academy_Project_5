const db = require("../models/db");

// This function to create new role

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;

  const values = [role];

  db.query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        role: result.rows,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};
//This function to create new permission
const createNewPermission = (req, res) => {
  const { permission } = req.body;

  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *`;
  const values = [permission];

  db.query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Permission created successfully",
        permission: result.rows,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

//This function to createNewRolePermission

const createNewRolePermission = (req, res) => {
  const { role_id, permission_id } = req.body;
  const query = `INSERT INTO role_permission (role_id, permission_id) VALUES ($1, $2) RETURNING *`;
  const values = [role_id, permission_id];

  db.query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role Permission created successfully",
        RolePermissions: result.rows,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    });
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
