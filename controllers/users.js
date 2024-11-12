const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
// const bcrypt = require(bcrypt);

//This function To create new user :
const register = async (req, res) => {
  const { first_name, last_name, email, password,country,role_id } =
    req.body;
  const normalizedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (first_name, last_name, email, normalizedEmail, hashedPassword,password, country, role_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [first_name, last_name,email,password,country,role_id];

  try {
    const result = await db.query(query, values);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,

      message: "The email already exists",

      err: error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  try {
    const result = db.query(query, values);
    const user = result.row[0];
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password",
      });
    }
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
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while logging in",
    });
  }
};
module.exports = { register, login };
