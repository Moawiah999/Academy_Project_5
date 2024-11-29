import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Spinner, Row, Col, Form } from "react-bootstrap";
import "./Packages.css";
import { ToastContainer, toast } from "react-toastify";
import { RiVisaFill } from "react-icons/ri";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { setUserToken, setUserId } from "../Redux/Reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";

const Packages = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});
  const [packagesInfo, setPackagesInfo] = useState({});
  const [checkId, setCheckId] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [ShowDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const { token, userId, role_id } = useSelector((state) => {
    return {
      token: state.user.token,
      userId: state.user.userId,
      role_id: state.user.role_id,
    };
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/Tour/all")
      .then((response) => {
        setTourPackages(response.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching tour packages");
        setLoading(false);
      });
  }, []);

  const handleCardClick = (packageData) => {
    setSelectedPackage(packageData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCardModal = () => {
    setShowPayment(true);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  const shortDescription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 4).join(" ") + " ...";
  };

  const handlePayment = (event) => {
    event.preventDefault();
    toast.success("Payment Confirmed! Thank you for booking.");
    handleClosePayment();
  };
  const handlePaymentNotAuth = (event) => {
    event.preventDefault();
    toast.error("You must be login for Book .");
    handleClosePayment();
  };

  const createPackages = () => {
    axios
      .post(`http://localhost:5000/Tour/createTour`, packagesInfo, {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then((response) => {
        toast.success("Add new package successfully.").catch((err) => {
          console.log(err);
        });
      });
  };
  const deletePackages = (tour_packages_id) => {
    axios
      .put(
        `http://localhost:5000/Tour/tour/${tour_packages_id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(tour_packages_id);

        toast.success("Deleted package successfully.");
        setTourPackages(
          tourPackages.filter(
            (packageItem) => packageItem.tour_packages_id !== tour_packages_id
          )
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting package.");
      });
  };

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
    <div
      className="packages-container"
      style={{
        fontFamily: "Roboto, sans-serif",
        marginBottom: "70px",
        marginTop: "30px",
      }}
    >
      {role_id === 1 && (
        <Form
          className="mb-3"
          style={{ marginLeft: "144px", marginBottom: "10px" }}
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
            ADD NEW PACKAGES
          </p>
          <Row className="mb-3">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name of company"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter destination"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      destination: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Duration Days</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter duration days"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      duration_days: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      start_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      end_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={2}>
              <Form.Group>
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter hotel name"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      hotel_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      price: e.target.value,
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
                  placeholder="Enter description"
                  rows={3}
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  onChange={(e) =>
                    setPackagesInfo({
                      ...packagesInfo,
                      image_url: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Button
                variant="danger"
                className="mt-4 w-50"
                onClick={() => createPackages()}
              >
                ADD
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      <Modal show={ShowDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this package ?</p>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deletePackages(checkId);
              setShowDeleteModal(false);
            }}
          >
            Delete Package
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Name of country</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.name}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Destination</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.destination}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
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
                  <Form.Label>
                    <strong>Duration days</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.duration_days}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        duration_days: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Start date</strong>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={selectedPackage.start_date}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        start_date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>End date</strong>
                  </Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={selectedPackage.end_date}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        end_date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Hotel name</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.hotel_name}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        hotel_name: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Price</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={selectedPackage.price}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        price: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Description</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.description}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <strong>Image url</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPackage.image_url}
                    onChange={(e) =>
                      setSelectedPackage({
                        ...selectedPackage,
                        image_url: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="danger"
              onClick={() => {
                axios
                  .put(
                    `http://localhost:5000/Tour/update/${selectedPackage.tour_packages_id}`,
                    selectedPackage,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    toast.success("The package was updated successfully.");

                    setUpdateModal(false);
                    axios
                      .get("http://localhost:5000/Tour/all")
                      .then((response) => {
                        setTourPackages(response.data.result);
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
          {tourPackages.map((item, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <div
                className="package-item"
                style={{
                  cursor: "pointer",
                  maxWidth: "350px",
                  margin: "0 auto",
                  marginBottom: "-30px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={item.image_url}
                  onClick={() => {
                    handleCardClick(item);
                    console.log(item.tour_packages_id);
                  }}
                  alt={item.destination}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  }}
                />
                <div style={{ padding: "16px", background: "#f8f9fa" }}>
                  <h5 className="text-success">{item.destination}</h5>
                  <p className="text-muted">
                    <strong>Duration: </strong>
                    {item.duration_days} days
                    <br />
                    <strong>Price: </strong>
                    <span className="text-success">${item.price}</span>
                    <p>
                      <strong>Description:</strong>{" "}
                      {shortDescription(item.description)}
                    </p>
                    <Button
                      variant="danger"
                      onClick={() =>
                        localStorage.getItem("token")
                          ? handleCardModal()
                          : handlePaymentNotAuth(event)
                      }
                    >
                      BookNow
                    </Button>
                    {role_id === 1 ? (
                      <>
                        
                        {/* <MdDeleteForever style={{fontSize : "16.5px" , borderRight:"20px"}}/> */}
                        <Button
                        
                          variant="danger"
                          style={{ marginLeft: "10px" }}
                          onClick={() => {
                            setShowDeleteModal(true);
                            setCheckId(item.tour_packages_id);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                    {role_id === 1 ? (
                      <Button
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          setSelectedPackage(item.checkId);
                          setUpdateModal(true);
                          console.log("Update", checkId);
                          console.log(setSelectedPackage(item));
                        }}
                      >
                        Update
                      </Button>
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{selectedPackage?.destination}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPackage && (
            <>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="d-block w-100"
                    src={selectedPackage?.image_url}
                    alt="Package image"
                  />
                </div>

                <div className="col-md-8">
                  <p>
                    <strong>Hotel :</strong> {selectedPackage?.hotel_name}
                  </p>
                  <p>
                    <strong>Duration :</strong> {selectedPackage?.duration_days}{" "}
                    days
                  </p>
                  <p>
                    <strong>Price :</strong> {selectedPackage?.price}
                  </p>
                  <p>
                    <strong>Description :</strong>{" "}
                    {selectedPackage?.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant="danger"
            onClick={() =>
              localStorage.getItem("token")
                ? handleCardModal()
                : handlePaymentNotAuth(event)
            }
          >
            BookNow
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      ></div>

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
                  name="cardNumber"
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
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                variant="danger"
                onClick={() =>
                  localStorage.getItem("token")
                    ? handlePayment(event)()
                    : handlePaymentNotAuth(event)
                }
              >
                Confirm Booking
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  handleClosePayment(false);
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Packages;
