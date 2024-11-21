const pool = require("../models/db");

const reserveHotelById = (req, res) => {
  const user_id = req.token.userId;
  const hotel_id = req.params.id;
  const { from_date, to_date } = req.body;
  pool
    .query(
      `INSERT INTO userHotel (user_id,hotel_id,from_date,to_date) VALUES ($1,$2,$3,$4) RETURNING *`,
      [user_id, hotel_id, from_date, to_date]
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

const cancelHotel = (req, res) => {
  const user_id = req.token.userId;
  const hotel_id = req.params;
  pool
    .query(
      "UPDATE userhotel SET is_deleted = 1 WHERE user_id = $1 AND hotel_id = $2",
      [user_id, hotel_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Reserve Canceled",
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

module.exports = { reserveHotelById, cancelHotel };
