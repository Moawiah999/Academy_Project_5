import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { RiVisaFill } from "react-icons/ri";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
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
  const { role_id } = useSelector((state) => {
    return { role_id: state.user.role_id };
  });
  const [flights, setFlights] = useState([]);
  const [flightsId, setFlightsId] = useState(0);
  const handlePayment = (e) => {
    e.preventDefault();
    toast.success("Payment Confirmed! Thank you for booking.");
  };
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
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const [flightNumber, setFlightNumber] = useState("");

  const [showPayment, setShowPayment] = useState(false);
  const handleClosePayment = () => {
    setShowPayment(false);
  };
  const handleCardModal = () => {
    setShowPayment(true);
  };
  useEffect(() => {
    console.log("role_id :", role_id);
    axios
      .get("http://localhost:5000/flights/")
      .then((result) => {
        setFlights(result.data.result);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  const handleShowModal = (flight) => {
    setSelectedFlight(flight);
    setFlightInformation({
      flight_id: flight.flights_id,
      flight_Company: flight.flight_company,
      flight_number: flight.flight_number,
      origin: flight.origin,
      destination: flight.destination,
      departure_time: flight.departure_time,
      arrival_time: flight.arrival_time,
      price: flight.price,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <ToastContainer />
      {role_id === 1 ? (
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
                  type="datetime-local"
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
                  type="datetime-local"
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
                    flightInformation.flight_Company.length === 0 ||
                    flightInformation.flight_number.length === 0 ||
                    flightInformation.origin.length === 0 ||
                    flightInformation.destination.length === 0 ||
                    flightInformation.departure_time.length === 0 ||
                    flightInformation.arrival_time.length === 0 ||
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
      ) : (
        <></>
      )}
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
      <Row style={{ marginTop: "80px" }}>
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
                      <strong>Departure:</strong> {flight.departure_time}
                    </Card.Text>
                    <Card.Text>
                      <strong>Arrival:</strong> {flight.arrival_time}
                    </Card.Text>
                  </Col>
                  <Col xs={2} className="text-center">
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (token === null || token === undefined) {
                          toast.error("You must log in.");
                        } else {
                          handleCardModal();
                          setFlightsId(flight.flights_id);
                          // axios
                          //   .post(
                          //     "http://localhost:5000/flights/bookFlight",
                          //     {
                          //       flights_id: flight.flights_id,
                          //     },
                          //     {
                          //       headers: { Authorization: `Bearer ${token}` },
                          //     }
                          //   )
                          //   .then(() => {
                          //     toast.success("Successful booking process.");
                          //   })
                          //   .catch(() => {
                          //     toast.error("The booking process failed.");
                          //   });
                        }
                      }}
                    >
                      Book Now
                    </Button>
                    {role_id === 1 ? (
                      <GrUpdate
                        onClick={() => {
                          handleShowModal(flight);
                        }}
                        size={20}
                        style={{
                          marginTop: "10px",
                          marginLeft: "70px",
                          display: "block",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                    {role_id === 1 ? (
                      <MdDeleteOutline
                        size={30}
                        style={{ marginTop: "10px" }}
                        onClick={() => {
                          setShowDeleteModal(true);
                          setFlightNumber(flight.flight_number);
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Flight</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Flight Company</Form.Label>
                  <Form.Control
                    type="text"
                    value={flightInformation.flight_Company}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        flight_Company: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Flight Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={flightInformation.flight_number}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        flight_number: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Origin</Form.Label>
                  <Form.Control
                    type="text"
                    value={flightInformation.origin}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        origin: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    value={flightInformation.destination}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        destination: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Departure Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={flightInformation.departure_time}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        departure_time: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={flightInformation.arrival_time}
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
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={flightInformation.price}
                    onChange={(e) =>
                      setFlightInformation({
                        ...flightInformation,
                        price: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              onClick={() => {
                console.log("flightInformation:", flightInformation);
                axios
                  .put(
                    `http://localhost:5000/flights/updateFlight/${flightInformation.flight_id}`,
                    flightInformation
                  )
                  .then(() => {
                    toast.success("The flight was updated successfully.");
                    setShowModal(false);
                    axios
                      .get("http://localhost:5000/flights/")
                      .then((result) => {
                        setFlights(result.data.result);
                      });
                  })
                  .catch(() => {
                    toast.error("Data update failed");
                  });
              }}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        show={ShowDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the flight:{" "}
          <strong>{selectedFlight?.flight_number}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              console.log("flightNumber :", flightNumber);
              axios
                .delete("http://localhost:5000/flights/deleteFlights", {
                  data: { flight_number: flightNumber },
                })
                .then(() => {
                  console.log("Deletion succeeded");
                  toast.success("Deletion successful.");
                  setShowDeleteModal(false);
                  setFlights((previousFlights) =>
                    previousFlights.filter(
                      (f) => f.flight_number !== flightNumber
                    )
                  );
                })
                .catch(() => {
                  toast.error("Deletion failed");
                });
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPayment} onHide={handleClosePayment}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePayment}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <div className="d-flex align-items-center">
                <FaCreditCard className="me-2" />
                <Form.Control
                  type="text"
                  name="card_number"
                  placeholder="Enter card number"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2" />
                <Form.Control
                  type="text"
                  name="expiration_date"
                  placeholder="MM/YY"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <div className="d-flex align-items-center">
                <FaLock className="me-2" />
                <Form.Control
                  type="text"
                  name="cvv"
                  placeholder="Enter CVV"
                  required
                />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cardholder Name</Form.Label>
              <div className="d-flex align-items-center">
                <RiVisaFill className="me-2" />
                <Form.Control
                  type="text"
                  name="cardholder_name"
                  placeholder="Enter cardholder name"
                  required
                />
              </div>
            </Form.Group>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="danger"
                type="submit"
                onClick={() => {
                  axios
                    .put(
                      `http://localhost:5000/reservations`,
                      {
                        flight_id: flightsId,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token} `,
                        },
                      }
                    )
                    .then((response) => {
                      console.log(response);

                      {
                        handlePayment;
                      }
                      setHotelPayment(false);
                      // toast.success(
                      //   "Payment Confirmed! Thank you for booking."
                      // );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Confirm Booking
              </Button>
              <Button variant="secondary" onClick={handleClosePayment}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Flights;
