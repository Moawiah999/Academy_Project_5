import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./HotelsDetails.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

const HotelsDetails = () => {
  const { token } = useSelector((state) => {
    return { token: state.user.token };
  });
  // console.log(token);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hotelPayment, setHotelPayment] = useState(false);
  const [chosenHotel, setChosenHotel] = useState("");
  const [hotel_id, setHotel_id] = useState("");
  const [fromDate, setFromDate] = useState(Date);
  const [toDate, setToDate] = useState(Date);

  useEffect(() => {
    axios
      .get("http://localhost:5000/hotels/")
      .then((result) => {
        // console.log(result.data.result);
        setHotelDetails(result.data.result);
        // console.log("ahmad", hotelDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const bookNow = (hotelDetails) => {
    setChosenHotel(hotelDetails);
    setShowDetail(true);
  };
  const confirmBooking = () => {
    setShowDetail(false);
    setHotelPayment(true);
  };
  const handlePayment = (e) => {
    e.preventDefault();
    setHotelPayment(false);
  };

  return (
    <>
      {/* <div>HotelsDetails</div> */}
      <div className="slider">
        <Carousel className="slider">
          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="First slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Second slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=400"
              // className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <>
        {/*  {hotelDetails.map((ele, i) => {
          return (
            <>
            <div>
              
              <Card style={{ width: "18rem", display: "grid" }}>
                <Card.Img variant="top" src={ele.image_url} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    <h3>{ele.location}</h3>
                    <h3>{ele.price_per_night} $</h3>
                  </Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </div> 
             
            </>
            
          );
        })} */}
        <Row
          xs={3}
          md={3}
          className="g-4"
          style={({ margin: "15px" }, { padding: "10px" })}
        >
          {hotelDetails.map((ele, i) => (
            <Col key={i}>
              <Card className="card">
                <Card.Img className="img2" variant="top" src={ele.image_url} />
                <Card.Body>
                  <Card.Title>{ele.name}</Card.Title>
                  <Card.Text>
                    <h4>{ele.price_per_night} $</h4>
                    <h4>City : {ele.location}</h4>
                  </Card.Text>
                  <Button variant="primary" onClick={() => bookNow(ele)}>
                    Book Now
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Modal show={showDetail} onHide={() => setShowDetail(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Hotel Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {chosenHotel && (
              <>
                <p>
                  <strong>Hotel Name:</strong> {chosenHotel.name},
                  {/* {setHotel_id(chosenHotel.hotel_id)} */}
                </p>
                <p>
                  <strong>City :</strong> {chosenHotel.location}
                </p>
                <p>
                  <strong>From Date :</strong>{" "}
                  <Col md={2}>
                    <Form.Group>
                      <Form.Control
                        type="date"
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </p>
                <p>
                  <strong>To Date :</strong>{" "}
                  {/* {new Date(chosenHotel.arrival_time).toLocaleString()} */}
                  <Col md={2}>
                    <Form.Group>
                      <Form.Control
                        type="date"
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </p>
                <p>
                  <strong>Price Per Night :</strong> $
                  {chosenHotel.price_per_night}
                </p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="primary" onClick={confirmBooking}>
              Confirm Booking
            </Button>
            <Button variant="secondary" onClick={() => setShowDetail(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={hotelPayment} onHide={() => setHotelPayment(false)}>
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
            <Button
              variant="danger"
              onClick={
                (confirmBooking,
                () => {
                  const hotel_id = chosenHotel.hotel_id;
                  /* console.log(fromDate, toDate);
                  console.log(token);
                  console.log(hotel_id); */
                  axios
                    .post(
                      `http://localhost:5000/userHotel/${hotel_id}`,
                      { from_date: fromDate, to_date: toDate },
                      {
                        headers: { Authorization: `Bearer ${token} ` },
                      }
                    )
                    .then((result) => {
                      console.log(result);
                      axios
                        .put(
                          `http://localhost:5000/reservations`,
                          {
                            hotel_id: hotel_id,
                          },
                          {
                            headers: { Authorization: `Bearer ${token} ` },
                          }
                        )
                        .then((response) => {
                          console.log(response);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
              }
            >
              Confirm Payment
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setHotelPayment(false);
                console.log(10);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </>
  );
};

export default HotelsDetails;
