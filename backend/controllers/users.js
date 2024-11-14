const db = require("../models/db");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

//This function To create new user :
const register = async (req, res) => {
  const { firstName, lastName, country, email, password, role_id } = req.body;

  const normalizedEmail = email.toLowerCase();
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users (first_name, last_name, country, email, password, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [
      firstName,
      lastName,
      country,
      normalizedEmail,
      encryptedPassword,
      role_id,
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(409).json({
      success: false,
      message: "The email already exists",
      err: err,
    });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  db.query(query, values)
    .then((result) => {
      const user = result.rows[0];
      if (!user) {
        return res.status(403).json({
          success: false,
          message: "Invalid email or password",
        });
      }
      // Compare passwords
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(403).json({
              success: false,
              message: "Invalid email or password",
            });
          }
          // Generate JWT token
          const payload = {
            userId: user.id,
            role: user.role_id,
          };
          const options = {
            expiresIn: "60m",
          };
          const token = jwt.sign(payload, process.env.SECRET, options);
          res.status(201).json({
            success: true,
            message: "Login successful",
            token,
            userId: user.id,
          });
        })
        .catch((error) => {
          console.error("Error comparing password:", error);
          res.status(500).json({
            success: false,
            message: "Error comparing password",
          });
        });
    })
    .catch((error) => {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while logging in",
      });
    });
};
module.exports = { register, login };
