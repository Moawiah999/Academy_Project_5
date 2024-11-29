import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "./HotelsDetails.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Modal, Form, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdDeleteOutline, MdDescription } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { FaCalendarAlt, FaCreditCard, FaLock } from "react-icons/fa";
import { RiVisaFill } from "react-icons/ri";

const HotelsDetails = () => {
  const { token } = useSelector((state) => {
    return { token: state.user.token };
  });
  // console.log(token);
  const [loading, setLoading] = useState(true);
  const [hotelDetails, setHotelDetails] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [hotelPayment, setHotelPayment] = useState(false);
  const [chosenHotel, setChosenHotel] = useState([]);
  const [updateHotel, setUpdateHotel] = useState([]);
  const [fromDate, setFromDate] = useState(Date);
  const [toDate, setToDate] = useState(Date);
  const [stars, setStars] = useState("");
  const [title, setTitle] = useState("");
  const [findHotel, setFindHotel] = useState({
    name: "",
    // rate: "",
    city: "",
    price: "",
  });
  const [addHotel, setAddHotel] = useState({
    name: "",
    location: "",
    price_per_night: "",
    image_url: "",
    rate: "",
    description: "",
  });
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteHotel, setDeleteHotel] = useState([]);
  const [editHotel, setEditHotel] = useState({
    name: "",
    image_url: "",
    location: "",
    price: "",
    rate: "",
    description: "",
  });

  // console.log(localStorage.getItem("role_id"));
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotels/")
      .then((result) => {
        // console.log(result.data.result);
        setHotelDetails(result.data.result);
        // console.log("ahmad", hotelDetails);
        // setFindHotel(result.data.result);
        // setTitle(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    toast.success("Hotel Updated Successfully");
  };
  const handleShowUpdate = (hotelDetails) => {
    setUpdateHotel(hotelDetails);
    setShowUpdate(true);
  };
  const handleShowDelete = (hotelDetails) => {
    setDeleteHotel(hotelDetails);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    toast.success("Hotel Deleted Successfully");
  };
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
    toast.success("Payment Confirmed! Thank you for booking.");
    setHotelPayment(false);
  };
  const shortDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 4).join(" ") + " ...";
  };
  const starsRate = (rate) => {
    if (rate === "5") {
      return <span>⭐️⭐️⭐️⭐️⭐️</span>;
    }
  };
  {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  return (
    <>
      {/* <div>HotelsDetails</div> */}
      <div className="slider">
        <Carousel className="slider p-3" style={{ "border-radius": "60px" }}>
          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://media.istockphoto.com/id/487042276/photo/hotel-sign.jpg?s=612x612&w=0&k=20&c=DjEVAoFnjB2cWwX28cxSKWkxsbze7o9jgkYrhyfmq9E="
              alt="First slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://media.istockphoto.com/id/591821200/photo/3d-rendering-luxury-hotel-reception-and-lounge.jpg?s=612x612&w=0&k=20&c=ujKL3aloZrbd87Q8fI8L6vTGJ_eAmfipVGxak-c4RTc="
              alt="Second slide"
              // className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              className="img"
              src="https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=600"
              // className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <Form
        className="mb-3"
        style={{ marginLeft: "139px", marginBottom: "10px" }}
      >
        <p
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "17px",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, red, black)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            letterSpacing: "1px",
          }}
        >
          Search
        </p>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Group>
              <Form.Label>Hotel Name :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Hotel Name"
                onChange={(e) =>
                  setFindHotel({
                    ...findHotel,
                    name: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Country :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                onChange={(e) =>
                  setFindHotel({
                    ...findHotel,
                    city: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Price Per Night $ :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price $"
                onChange={(e) =>
                  setFindHotel({ ...findHotel, price: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button
              variant="danger"
              className="mt-4 w-50"
              onClick={() => {
                console.log(findHotel);
                const detail = hotelDetails.filter((ele, i) => {
                  /* console.log(
                          ele.name.includes(findHotel.name) ||
                            ele.name.includes(stars)
                        ); */
                  return ele.name.includes(findHotel.name);
                });
                // console.log(stars);
                console.log(detail);
                setHotelDetails(detail);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Form style={{ marginTop: "50px" }}>
        <Row className="align-items-end">
          {/*    <Form.Label>Stars</Form.Label>
        <DropdownButton
            id="dropdown-basic-button"
            variant="danger"
            title="Stars"
          >
            <Dropdown.Item
              onClick={() => {
                setStars("");
              }}
            >
              All
            </Dropdown.Item>
            <Dropdown.Item
              value={"⭐️⭐️⭐️⭐️⭐️"}
              onClick={() => {
                setStars("⭐️⭐️⭐️⭐️⭐️");
                console.log(stars);
              }}
            >
              5 Stars⭐️⭐️⭐️⭐️⭐️
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setStars("⭐️⭐️⭐️⭐️☆");
                // setTitle("5 stars");
              }}
            >
              4 Stars⭐️⭐️⭐️⭐️☆
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setStars("⭐️⭐️⭐️☆☆");
                console.log(stars);
              }}
            >
              3 Stars⭐️⭐️⭐️☆☆
            </Dropdown.Item>
          </DropdownButton> */}
        </Row>
      </Form>
      <>
        {localStorage.getItem("role_id") == 1 ? (
          <>
            <Form
              className="mb-3"
              style={{ marginLeft: "139px", marginBottom: "10px" }}
            >
              <p
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  fontSize: "17px",
                  textTransform: "uppercase",
                  background: "linear-gradient(90deg, red, black)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                  letterSpacing: "1px",
                }}
              >
                ADD NEW HOTEL
              </p>

              <Row className="mb-3">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Hotel Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Hotel Name"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Hotel Location"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          location: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Price Per Night $</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Hotel Price $"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          price_per_night: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Picture For The Hotel</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Image_url For The Hotel"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          image_url: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Rate</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Rate For The Hotel"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          rate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter Description For The Hotel"
                      onChange={(e) =>
                        setAddHotel({
                          ...addHotel,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Button
                    variant="danger"
                    className="mt-4 w-60"
                    onClick={() => {
                      console.log(addHotel);
                      if (
                        addHotel.name.length === 0 ||
                        addHotel.location.length === 0 ||
                        addHotel.price_per_night.length === 0 ||
                        addHotel.image_url.length === 0 ||
                        addHotel.rate.length === 0 ||
                        addHotel.description.length === 0
                      ) {
                        toast.error("All these fields are required.");
                      }

                      axios
                        .post(
                          "http://localhost:5000/hotels/",
                          addHotel
                          /*    {
                            headers: { Authorization: `Bearer ${token}` },
                          } */
                        )
                        .then((result) => {
                          console.log(result);
                          F;
                          toast.success("The hotel was created successfully.");
                        })
                        .catch((err) => {
                          // console.log(addHotel);
                          console.log("Error :", err);
                        });
                    }}
                  >
                    Add The Hotel
                  </Button>
                </Col>
              </Row>
            </Form>
          </>
        ) : (
          <></>
        )}

        <br />
        <div
          className="packages-container"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ minHeight: "80vh" }}
          >
            <Row
              xs={1}
              sm={2}
              md={3}
              lg={4}
              className="g-4 justify-content-center"
              style={{ gap: "70px" }}
            >
              {hotelDetails.map((ele, i) => (
                <Col key={i} className="d-flex justify-content-center">
                  <div
                    className="package-item"
                    style={{
                      cursor: "pointer",
                      width: "100%",
                      maxWidth: "350px",
                      margin: "0 auto",
                      marginBottom: "30px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      onClick={() => bookNow(ele)}
                      src={ele.image_url}
                      // alt={item.destination}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />
                    <div style={{ padding: "16px", background: "#f8f9fa" }}>
                      <h5
                        className="text-success"
                        // style={{ textAlign: "center" }}
                      >
                        {ele.name}
                      </h5>
                      <p className="text-muted">
                        <strong>City :</strong>
                        <span className="text-success">{ele.location}</span>
                        <br />
                        <strong
                          onClick={() => {
                            bookNow(ele);
                          }}
                        >
                          Description :
                        </strong>
                        <span
                          className="text-success"
                          onClick={() => {
                            bookNow(ele);
                          }}
                        >
                          {shortDescription(ele.description)}
                        </span>
                        <br />
                        <strong>
                          Rate :{" "}
                          <span className="text-success">
                            {starsRate(ele.rate)}
                          </span>
                        </strong>
                        <br />
                        <strong>Price : </strong>
                        <span className="text-success">
                          ${ele.price_per_night}
                        </span>
                        <br />
                      </p>
                      <Button
                        variant="danger"
                        style={{ display: "inline" }}
                        onClick={() => {
                          localStorage.getItem("token")
                            ? bookNow(ele)
                            : toast.error("You must be login for Book .");
                        }}
                      >
                        Book Now
                      </Button>
                      {localStorage.getItem("role_id") == 1 ? (
                        <>
                          <GrUpdate
                            onClick={() => {
                              handleShowUpdate(ele);
                            }}
                            size={20}
                            style={{
                              marginLeft: "30px",
                              display: "inline",
                            }}
                          />
                          <MdDeleteOutline
                            size={30}
                            style={{
                              marginLeft: "20px",
                              display: "inline",
                            }}
                            onClick={() => {
                              handleShowDelete(ele);
                            }}
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
          <Modal
            show={showDelete}
            onHide={() => {
              setShowDelete(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ textAlign: "center" }}>Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete the hotel ?</Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="danger"
                onClick={() =>
                  axios
                    .delete(
                      `http://localhost:5000/hotels/${deleteHotel.hotel_id}`
                    )
                    .then((result) => {
                      handleCloseDelete();
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }
              >
                Delete
              </Button>
              <Button variant="secondary" onClick={() => setShowDelete(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showUpdate}
            onHide={() => {
              setShowUpdate(false);
            }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Hotel Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                {updateHotel && (
                  <>
                    <Form>
                      <Row className="mb-3">
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Hotel Name:</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={updateHotel.name}
                              onChange={(e) => {
                                setEditHotel({
                                  ...editHotel,
                                  name: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Image_url :</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={updateHotel.image_url}
                              onChange={(e) => {
                                setEditHotel(
                                  e.target.value
                                    ? {
                                        ...editHotel,
                                        image_url: e.target.value,
                                      }
                                    : {
                                        ...editHotel,
                                        image_url: updateHotel.image_url,
                                      }
                                );
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Description :</strong>
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              placeholder={updateHotel.description}
                              onChange={(e) => {
                                setEditHotel({
                                  ...editHotel,
                                  description: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>City :</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={updateHotel.location}
                              onChange={(e) => {
                                setEditHotel({
                                  ...editHotel,
                                  location: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Price Per Night :</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={updateHotel.price_per_night + "$"}
                              onChange={(e) => {
                                setEditHotel({
                                  ...editHotel,
                                  price_per_night: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>
                              <strong>Rate :</strong>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder={updateHotel.rate}
                              onChange={(e) => {
                                setEditHotel({
                                  ...editHotel,
                                  rate: e.target.value,
                                });
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>

                    <Modal.Footer className="d-flex justify-content-center">
                      <Button
                        variant="danger"
                        onClick={() => {
                          axios
                            .put(
                              `http://localhost:5000/hotels/${updateHotel.hotel_id}`,
                              editHotel
                            )
                            .then((result) => {
                              console.log(result);
                              {
                                handleCloseUpdate();
                              }
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                      >
                        Update Hotel
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setShowUpdate(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={showDetail} onHide={() => setShowDetail()}>
            <Modal.Header closeButton>
              <Modal.Title>Hotel Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {chosenHotel && (
                <>
                  <p>
                    <strong>Hotel Name:</strong> {chosenHotel.name}
                    {/* {setHotel_id(chosenHotel.hotel_id)} */}
                  </p>
                  <p>
                    <strong>City :</strong> {chosenHotel.location}
                  </p>
                  <p>
                    <strong>Description :</strong> {chosenHotel.description}
                  </p>
                  <p>
                    <strong>From Date :</strong>
                    <Col lg={10}>
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
                    <Col lg={10}>
                      <Form.Group>
                        <Form.Control
                          type="date"
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </p>
                  <p>
                    <strong>Rate :</strong> {starsRate(chosenHotel.rate)}
                  </p>
                  <p>
                    <strong>Price Per Night :</strong> $
                    {chosenHotel.price_per_night}
                  </p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="danger" onClick={confirmBooking}>
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
                  <div className="d-flex align-items-center">
                    <FaCreditCard className="me-2" />
                    <Form.Control
                      type="text"
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
                      name="experinceDate"
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
                      name="cardHolderName"
                      placeholder="Enter cardholder name"
                      required
                    />
                  </div>
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
                            toast.success(
                              "Payment Confirmed! Thank you for booking."
                            );
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
                  // console.log(10);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <ToastContainer />
        </div>
      </>
    </>
  );
};

export default HotelsDetails;
