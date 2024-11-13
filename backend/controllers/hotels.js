const { pool } = require("../models/db");

const createHotel = (req, res) => {
  const { name, location, price_per_night, image_url } = req.body;
  pool
    .query(
      `INSERT INTO hotels (name ,location , price_per_night , image_url) VALUES ($1,$2,$3,$4) RETURNING *`,
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

const getAllHotels = (req, res) => {
  pool
    .query(`SELECT * FROM hotels WHERE hotels.is_deleted=0`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the hotels",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
const updateHotelById = (req, res) => {
  const id = req.params.id;
  const { name, location, price_per_night, image_url } = req.body;
  pool
    .query(
      `UPDATE hotels SET name='${name}',location='${location}',price_per_night='${price_per_night}',image_url='${image_url}' WHERE hotel_id='${id}' RETURNING *`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Hotel with id:${id} updated successfully`,
        article: result.rows,
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
module.exports = { createHotel, getAllHotels, updateHotelById };
