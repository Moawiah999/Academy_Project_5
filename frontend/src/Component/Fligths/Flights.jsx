import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import axios from "axios";
const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [findeFlight, setFindeFlight] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/flights/")
      .then((result) => {
        setFlights(result.data.result);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  return (
    <Container>
      <h2>Search for Flights</h2>
      <Form>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Origin</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter origin"
                onChange={(e) =>
                  setFindeFlight({ ...findeFlight, origin: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                onChange={(e) =>
                  setFindeFlight({
                    ...findeFlight,
                    destination: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setFindeFlight({
                    ...findeFlight,
                    departure_date: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button
              variant="danger"
              className="w-100"
              onClick={() => {
                const { origin, destination, departure_date } = findeFlight;
                axios
                  .get("http://localhost:5000/flights/findAtrip", {
                    params: {
                      origin,
                      destination,
                      departure_date,
                    },
                  })
                  .then((result) => {
                    console.log("result : ", result.data.result);
                    setFlights(result.data.result);
                  })
                  .catch((err) => {
                    console.log("err : ", err);
                  });
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "100px" }}></div>
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
                    <Button variant="danger">Book Now</Button>
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
