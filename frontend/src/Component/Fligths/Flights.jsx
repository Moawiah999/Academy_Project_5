import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import axios from "axios";
const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [findeFlight, setFindeFlight] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
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

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };
  const handleConfirmBooking = () => {
    setShowModal(false);
    setShowPaymentModal(true);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setShowPaymentModal(false);
  };
  return (
    <Container>
      <Form style={{ marginTop: "50px" }}>
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
            <Card style={{ height: "150px" }}>
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
                    <Button
                      variant="danger"
                      onClick={() => handleBookNow(flight)}
                    >
                      Book Now
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Flight Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedFlight && (
            <>
              <p>
                <strong>Flight Company:</strong> {selectedFlight.flight_company}
              </p>
              <p>
                <strong>Flight Number:</strong> {selectedFlight.flight_number}
              </p>
              <p>
                <strong>Origin:</strong> {selectedFlight.origin}
              </p>
              <p>
                <strong>Destination:</strong> {selectedFlight.destination}
              </p>
              <p>
                <strong>Departure Time:</strong>{" "}
                {new Date(selectedFlight.departure_time).toLocaleString()}
              </p>
              <p>
                <strong>Arrival Time:</strong>{" "}
                {new Date(selectedFlight.arrival_time).toLocaleString()}
              </p>
              <p>
                <strong>Price:</strong> ${selectedFlight.price}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePayment}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control type="text" placeholder="MM/YY" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <Form.Control type="text" placeholder="Enter CVV" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter cardholder name"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger" onClick={handleConfirmBooking}>
            Confirm Payment
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Flights;
