const db = require("../models/db");

const getReservationsById = async (req, res) => {
  const user_id = req.token.userId;

  const query = `SELECT * FROM reservations WHERE user_id = $1`;

  const values = [user_id];

  try {
    const result = await db.query(query, values);
    res.status(200).json({
      success: true,
      message: `Reservations found for user with ID: ${user_id}`,
      result: result.rows,
    });
  } catch (error) {
    console.log(error);

    res.status(404).json({
      success: false,
      message:
        "No reservations found for this user or the reservations may have been deleted.",
    });
  }
};

const createFlightsReservation = (req, res) => {
  const user_id = req.token.userId;
  const { flight_id } = req.body;

  db.query(
    "INSERT INTO reservations (user_id,flight_id)  VALUES ($1,$2) RETURNING *",
    [user_id, flight_id]
  )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Flights Reservation successfully",
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
const createHotelsReservation = (req, res) => {
  console.log(" createHotelsReservation ");
  const user_id = req.token.userId;
  const { hotel_id } = req.body;
  db.query(
    "INSERT INTO reservations (user_id,hotel_id)  VALUES ($1,$2) RETURNING *",
    [user_id, hotel_id]
  )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Hotel Reservation successfully",
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
const updateReservation = (req, res) => {
  const user_id = req.token.userId;
  const { hotel_id, flight_id, tour_packages_id } = req.body;
  db.query(
    "UPDATE reservations SET hotel_id = COALESCE($1,hotel_id) , flight_id = COALESCE($2,flight_id) , tour_package_id = COALESCE($3,tour_packages_id) WHERE user_id = $4 RETURNING *",
    [hotel_id, flight_id, tour_packages_id, user_id]
  )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Reserve Updated Successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
module.exports = {
  getReservationsById,
  createFlightsReservation,
  createHotelsReservation,
  updateReservation,
};
