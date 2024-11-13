const db = require("../models/db");

const getReservationsById = async (req,res)=>{
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

  const values = [user_id] ;

  try {
    const result = await db.query(query,values);
    res.status(200).json({
        success: true,
        message: `Reservations found for user with ID: ${user_id}`,
        result: result.rows,
      });
  } catch (error) {
    console.log(error);
    
    res.status(404).json({
        success: false,
        message: "No reservations found for this user or the reservations may have been deleted."
    });
  }
}

module.exports = {getReservationsById};