import React, { useState, useEffect } from "react";
import axios from "axios";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);  
  const [loading, setLoading] = useState(true);          
  const [error, setError] = useState(null);               

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    axios
      .get("http://localhost:5000/reservations/allReservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setReservations(response.data.result); 
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching reservations");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Reservations</h1>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservation_id}>
            <h3>Reservation ID: {reservation.reservation_id}</h3>
            <p>User ID: {reservation.user_id}</p>
            <p>Reservation Date: {new Date(reservation.reservation_date).toLocaleString()}</p>
            <p>Status: {reservation.status}</p>
            <p>Tour Package ID: {reservation.tour_package_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;