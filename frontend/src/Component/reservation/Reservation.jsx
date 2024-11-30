import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import { format } from "date-fns"; // Add date-fns for date formatting

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
        console.log(response.data.result);
        setReservations(response.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching reservations");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (reservations.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">You have no reservations at the moment.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "17px",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, red, black)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              letterSpacing: "1px",
            }}>Your Reservations : </h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Flight Company</th>
            <th>Flight Number</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Flight Price</th>
            <th>Hotel Name</th>
            <th>Hotel Location</th>
            <th>Hotel Price per Night</th>
            <th>Rate </th>

            <th>Tour Package Destination</th>
            <th>Tour Package Price</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservation_id}>
              <td>{reservation.flight_company}</td>
              <td>{reservation.flight_number}</td>
              <td>{reservation.origin}</td>
              <td>{reservation.destination}</td>
              <td>{reservation.start_date}</td>
              <td>{reservation.end_date}</td>
              <td>${reservation.flight_price}</td>
              <td>{reservation.name}</td>
              <td>{reservation.location}</td>
              <td>${reservation.price_per_night}</td>
              <td>⭐{reservation.rate}</td>

              <td>{reservation.destination}</td>

              <td>${reservation.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Reservations;
