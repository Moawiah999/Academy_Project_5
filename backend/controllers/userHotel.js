const { pool } = require("../models/db");

const reserveHotelById = (req, res) => {
  const user_id = req.token.userId;
  const hotel_id = req.params.id;
  pool
    .query(
      `INSESRT INTO userHotel (user_id,hotel_id) VALUES ($1,$2) RETURNING *`,
      [user_id, hotel_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Hotel Reserved",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getMyHotels = (req, res) => {
  pool.query(`SELECT * FROM `);
};

module.exports = { reserveHotelById };
