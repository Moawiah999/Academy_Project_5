import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
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
  const { token } = useSelector((state) => {
    return { token: state.user.token };
  });
  const [flights, setFlights] = useState([]);

  const [findeFlight, setFindeFlight] = useState({
    origin: "",
    destination: "",
    departure_date: "",
  });
  const [flightInformation, setFlightInformation] = useState({
    flight_Company: "",
    flight_number: "",
    origin: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
    price: "",
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
      <ToastContainer />
      {
        <Form className="mb-4">
          <h3>New Trip</h3>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Flight Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter flight company"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      flight_Company: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Flight Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter flight number"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      flight_number: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Origin</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter origin"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      origin: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      destination: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Departure Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      departure_time: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Arrival Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      arrival_time: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price in USD"
                  onChange={(e) =>
                    setFlightInformation({
                      ...flightInformation,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button
                variant="danger"
                className="mt-4 w-50"
                onClick={() => {
                  if (
                    flightInformation.flight_Company.length === 0 &&
                    flightInformation.flight_number.length === 0 &&
                    flightInformation.origin.length === 0 &&
                    flightInformation.destination.length === 0 &&
                    flightInformation.departure_time.length === 0 &&
                    flightInformation.arrival_time.length === 0 &&
                    flightInformation.price.length === 0
                  ) {
                    toast.error("All these fields are required.");
                  }

                  axios
                    .post("http://localhost:5000/flights/", flightInformation, {
                      headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((result) => {
                      toast.success("The flight was created successfully.");
                    })
                    .catch((err) => {
                      console.log("Error while creating flight:", err);
                    });
                }}
              >
                Create a flight
              </Button>
            </Col>
          </Row>
        </Form>
      }

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
                min={new Date().toISOString().split("T")[0]}
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
                      <strong>Origin:</strong>{" "}
                      {flight.origin.charAt(0).toUpperCase() +
                        flight.origin.slice(1)}
                    </Card.Text>
                    <Card.Text>
                      <strong>Destination:</strong>{" "}
                      {flight.destination.charAt(0).toUpperCase() +
                        flight.destination.slice(1)}
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
                    <Button
                      variant="danger"
                      style={{ marginTop: "10px" }}
                      onClick={() => {
                        axios
                          .delete(
                            "http://localhost:5000/flights/deleteFlights",
                            {
                              data: { flight_number: flight.flight_number },
                            }
                          )
                          .then(() => {
                            console.log("Deletion succeeded");
                            toast.success("Deletion successful.");
                            setFlights((previousFlights) =>
                              previousFlights.filter(
                                (f) => f.flight_number !== flight.flight_number
                              )
                            );
                          })
                          .catch(() => {
                            toast.error("Deletion failed");
                          });
                      }}
                    >
                      Deletion flights
                    </Button>
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
