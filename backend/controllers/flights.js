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
    INSERT INTO flights (flight_Company, flight_number, origin, destination, departure_time, arrival_time, price,userId)
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

module.exports = { createFlights };
