const db = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//This function To create new user :
const register = async (req, res) => {
  const { first_name, last_name, country, email, password, role_id } = req.body;
  const normalizedEmail = email.toLowerCase();
  const encryptedPassword = await bcrypt.hash(password, 5);

  const query = `INSERT INTO users (first_name, last_name, country, email, password, role_id) 
                 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  const values = [
    first_name,
    last_name,
    country,
    normalizedEmail,
    encryptedPassword,
    role_id,
  ];

  db.query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(409).json({
        success: false,
        message: "The email already exists",
        err: err,
      });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];

  try {
    const result = await db.query(query, values);
    const user = result.rows[0];

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
        message: "An error occurred while logging in",
      });
    }

    const payload = {
      userId: user.user_id,
      role: user.role_id,
    };

    const options = {
      expiresIn: "60m",
    };

    const token = jwt.sign(payload, process.env.SECRET, options);
    // console.log("test")
    res.status(201).json({
      success: true,
      message: "Login successful",
      token: token,
      userId: user.user_id,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      success: false,
      message: "Valid Loin Credentials",
      err: err.message,
    });
  }
};

module.exports = { register, login };
