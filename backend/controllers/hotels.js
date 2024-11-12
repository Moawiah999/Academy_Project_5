const { pool } = require("../models/db");

const createHotel = (req, res) => {
  const { name, location, price_per_night, image_url } = req.body;
  pool
    .query(
      `INSERT INTO hotels (name ,location , price_per_night , image_url) VALUES ($1,$2,$3,$4)`,
      [name, location, price_per_night, image_url]
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Hotel created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

module.exports = { createHotel };