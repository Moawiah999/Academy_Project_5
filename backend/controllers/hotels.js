const pool = require("../models/db");

const createHotel = (req, res) => {
  const { name, location, price_per_night, image_url, description, rate } =
    req.body;
  pool
    .query(
      `INSERT INTO hotels (name ,location , price_per_night , image_url,description,rate) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [name, location, price_per_night, image_url, description, rate]
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
  const { name, location, price_per_night, image_url, rate, description } =
    req.body;
  pool
    .query(
      `UPDATE hotels SET name='${name}',location='${location}',price_per_night='${price_per_night}',image_url='${image_url}',rate='${rate}',description='${description}' WHERE hotel_id='${id}' RETURNING *`
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
const deleteHotelById = (req, res) => {
  const id = req.params.id;
  pool
    .query(`UPDATE hotels SET is_deleted=1 WHERE hotel_id='${id}'`)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Hotel with id : ${id} deleted successfully`,
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
const getHotelById = (req, res) => {
  const id = req.params.id;
  // console.log(req.params.id);
  pool
    .query(
      `SELECT * FROM hotels WHERE hotel_id='${id}' AND hotels.is_deleted=0`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `Hotel ${id}`,
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
const getBestHotels = (req, res) => {
  // console.log(10);
  pool
    .query(
      `SELECT * FROM hotels WHERE hotels.is_deleted=0 ORDER BY hotel_id LIMIT 6 OFFSET 0`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Best hotels",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
module.exports = {
  createHotel,
  getAllHotels,
  updateHotelById,
  deleteHotelById,
  getHotelById,
  getBestHotels,
};
// ORDER BY id LIMIT 6 OFFSEST 0
