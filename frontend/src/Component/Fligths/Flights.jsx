import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/flights/")
      .then((result) => {
        setFlights(result.data.result);
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  }, []);

  return (
    <Container>
      <h1 className="my-4">Available Flights</h1>
      <Row>
        {flights.map((flight) => (
          <Col key={flight.flights_id} xs={12} className="mb-4">
            <Card>
              <Card.Body>
                <Row className="d-flex align-items-center">
                  <Col xs={2}>
                    <Card.Title>{flight.flight_company}</Card.Title>
                    <Card.Subtitle className="text-muted">
                      {flight.flight_number}
                    </Card.Subtitle>
                  </Col>

                  <Col xs={2} className="text-center">
                    <Card.Text>
                      <strong>Price:</strong> ${flight.price}
                    </Card.Text>
                  </Col>

                  <Col xs={3}>
                    <Card.Text>
                      <strong>Origin:</strong> {flight.origin}
                    </Card.Text>
                    <Card.Text>
                      <strong>Destination:</strong> {flight.destination}
                    </Card.Text>
                  </Col>

                  <Col xs={3}>
                    <Card.Text>
                      <strong>Departure:</strong>{" "}
                      {new Date(flight.departure_time).toLocaleString()}
                    </Card.Text>
                    <Card.Text>
                      <strong>Arrival:</strong>{" "}
                      {new Date(flight.arrival_time).toLocaleString()}
                    </Card.Text>
                  </Col>

                  <Col xs={2} className="text-center">
                    <Button variant="primary">Book Now</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Flights;
