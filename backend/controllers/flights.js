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
  const user_id = req.token.userId;
  const { flights_id } = req.body;

  const query = `
      INSERT INTO userFlight (user_id, flights_id)
      VALUES ($1, $2) RETURNING *;
    `;
  const values = [user_id, flights_id];

  db.query(query, values)
    .then((result) => {
      res.status(201).json({
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
  const query = `
    SELECT * FROM flights 
    WHERE 
      (origin ILIKE $1 OR $1 IS NULL) AND 
      (destination ILIKE $2 OR $2 IS NULL) AND 
      (CAST(departure_time AS date) = $3 OR $3 IS NULL);
  `;

  const values = [
    origin ? `%${origin.toLowerCase()}%` : null,
    destination ? `%${destination.toLowerCase()}%` : null,
    departure_date || null,
  ];
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
  const query = "SELECT * FROM flights WHERE is_deleted=0";
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
const deleteFlights = (req, res) => {
  const { flight_number } = req.body;
  const values = [flight_number];
  console.log("flight_number : ", flight_number);
  // const query = "DELETE FROM flights WHERE flight_number = $1 RETURNING *";
  const query = `UPDATE flights SET is_deleted = 1 WHERE flight_number = $1 RETURNING *`;
  db.query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "DELETE Flight successfully",
        result: result,
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
const updateFlight = (req, res) => {
  let id_flight = req.params.idFlights;
  id_flight = Number(id_flight);
  const {
    flight_Company,
    flight_number,
    origin,
    destination,
    departure_time,
    arrival_time,
    price,
  } = req.body;

  const values = [
    flight_Company,
    flight_number,
    origin,
    destination,
    departure_time,
    arrival_time,
    price,
    id_flight,
  ];

  const query = `
    UPDATE flights 
    SET 
      flight_Company = COALESCE($1, flight_Company),
      flight_number = COALESCE($2, flight_number),
      origin = COALESCE($3, origin),
      destination = COALESCE($4, destination),
      departure_time = COALESCE($5, departure_time),
      arrival_time = COALESCE($6, arrival_time),
      price = COALESCE($7, price)
    WHERE flights_id = $8
    RETURNING *;
  `;

  db.query(query, values)
    .then((result) => {
      if (result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Flight not found",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Flight updated successfully",
          result: result.rows[0],
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Update failed",
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
  deleteFlights,
  updateFlight,
};
