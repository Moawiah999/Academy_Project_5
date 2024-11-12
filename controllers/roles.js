const db = require("../models/db");

// This function to create new role

const createNewRole = async (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;

  const values = [role];

  try {
    const result = await db.query(query, values);
    res.status(201).json({
      success: true,

      massage: "Role created successfully",

      role: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      massage: "Server error",
    });
  }
};
//This function to create new permission
const createNewPermission = async (req, res) => {
  const { permission } = req.body;

  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *`;
  const values = [permission];
  try {
    const result = await db.query(query, values);

    res.status(201).json({
      success: true,

      massage: "permission created successfully",

      permission: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      massage: "Server error",
    });
  }
};

//This function to createNewRolePermission

const createNewRolePermission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  const query = `INSERT INTO role_permission (role_id , permission_id) VALUES ($1,$2) RETURNING *`;
  const values = [role_id, permission_id];

  try {
    const result = await db.query(query, values);
    res.status(201).json({
      success: true,

      massage: "Role Permission created successfully",

      RolePermissions: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      massage: "Server error",
    });
  }
};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
