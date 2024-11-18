const { query } = require("express");
const db = require("../models/db");

const createFlights = (req, res) => {
  const {
    flight_Company,
    flight_number,
    origin,
    destination,
    departure_time,
    arrival_time,
    price,
  } = req.body;
  const query = `
    INSERT INTO flights (flight_Company, flight_number, origin, destination, departure_time, arrival_time, price)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
  `;
  const values = [
    flight_Company,
    flight_number,
    origin,
    destination,
    departure_time,
    arrival_time,
    price,
  ];

  db.query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Flights created successfully",
        result: result,
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
const bookFlight = (req, res) => {
  const { user_id, flights_id } = req.body;

  module.exports = { createFlights };
  const query = `
      INSERT INTO userFlight (user_id, flights_id)
      VALUES ($1, $2) RETURNING *;
    `;
  const values = [user_id, flights_id];

  db.query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Flight booked successfully",
        result: result.rows[0],
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
const findAtrip = (req, res) => {
  const { origin, destination, departure_date } = req.query;
  const query =
    "SELECT * FROM flights WHERE origin=$1 and destination=$2 and CAST(departure_time AS TIMESTAMP)=$3";

  const values = [origin, destination, departure_date];
  db.query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Get All Flight successfully",
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

const cancelFlight = (req, res) => {
  // user_id from token
  const { user_id, flights_id } = req.body;

  const query = `
    DELETE FROM userFlight
    WHERE user_id = $1 AND flights_id = $2
    RETURNING *;
  `;
  const values = [user_id, flights_id];

  db.query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "No booking found to cancel",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Flight booking canceled successfully",
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
const getAllFlight = (req, res) => {
  const query = "SELECT * FROM flights";
  db.query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Get All Flight successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "No flights",
        err: err,
      });
    });
};
module.exports = {
  createFlights,
  bookFlight,
  findAtrip,
  cancelFlight,
  getAllFlight,
};