const db = require("../models/db");

const getReservationsById = async (req, res) => {
  const user_id = req.params.user_id;

  const query = `SELECT reservations.reservation_id , reservations.reservation_date,
    reservations.status ,
    users.first_name,
    users.last_name , flights.flight_Company, flights.flight_number , flights.price ,
    hotels.name , hotels.price_per_night ,hotels.location FROM reservations INNER JOIN users ON users.user_id = reservations.user_id
    LEFT JOIN flights ON flights.flights_id = reservations.flight_id
    LEFT JOIN hotels ON hotels.hotel_id = reservations.hotel_id
    LEFT JOIN tour_packages ON tour_packages.tour_packages_id = reservations.tour_package_id
    WHERE reservations.user_id = $1 AND reservations.is_deleted = 0;
  `;

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

const createReservation = (req, res) => {
  const user_id = req.token.userId;
  db.query("INSERT INTO reservations (user_id)  VALUES ($1) RETURNING *", [
    user_id,
  ])
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "My Reservation",
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
  const { hotel_id, flight_id, tour_package_id } = req.body;
  db.query(
    "UPDATE reservations SET hotel_id = COALESCE($1,hotel_id) , flight_id = COALESCE($2,flight_id) , tour_package_id = COALESCE($3,tour_package_id) WHERE user_id = $4 RETURNING *",
    [hotel_id, flight_id, tour_package_id, user_id]
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
module.exports = { getReservationsById, createReservation, updateReservation };
