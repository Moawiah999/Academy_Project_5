import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Spinner, Row, Col, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { RiVisaFill } from "react-icons/ri";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./Packages.css";

const Packages = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({
    showDetails: false,
    showPayment: false,
    selectedPackage: null,
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

  const handleShowDetails = (packageData) => {
    setModalState({ ...modalState, showDetails: true, selectedPackage: packageData });
  };

  const handleCloseDetails = () => {
    setModalState({ ...modalState, showDetails: false, selectedPackage: null });
  };

  const handleShowPayment = () => {
    setModalState({ ...modalState, showPayment: true });
  };

  const handleClosePayment = () => {
    setModalState({ ...modalState, showPayment: false });
  };

  const handlePayment = (event) => {
    event.preventDefault();
    toast.success("Payment Confirmed! Thank you for booking.");
    handleClosePayment();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="packages-container" style={{ fontFamily: "Roboto, sans-serif" }}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center" style={{ gap: "70px" ,marginBottom:"100px" , marginTop:"30px"}}>
        {tourPackages.map((item, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <div
              className="package-item"
              style={{
                cursor: "pointer",
                maxWidth: "350px",
                margin: "0 auto",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={item.image_url}
                alt={`Image of ${item.destination}`}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
                onClick={() => handleShowDetails(item)}
              />
              <div style={{ padding: "16px", background: "#f8f9fa" }}>
                <h5 className="text-success">{item.destination}</h5>
                <p className="text-muted">
                  <strong>Duration:</strong> {item.duration_days} days
                  <br />
                  <strong>Price:</strong> <span className="text-success">${item.price}</span>
                </p>
                <Button variant="danger" onClick={() => handleShowDetails(item)}>
                  View Details
                </Button>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={modalState.showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>{modalState.selectedPackage?.destination}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalState.selectedPackage && (
            <>
              <p>
                <strong>Hotel:</strong> {modalState.selectedPackage.hotel_name}
              </p>
              <p>
                <strong>Duration:</strong> {modalState.selectedPackage.duration_days} days
              </p>
              <p>
                <strong>Price:</strong> ${modalState.selectedPackage.price}
              </p>
              <p>
                <strong>Description:</strong> {modalState.selectedPackage.description}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleShowPayment}>
            Proceed to Payment
          </Button>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={modalState.showPayment} onHide={handleClosePayment}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePayment}>
            <Form.Group>
              <Form.Label>Card Number</Form.Label>
              <div className="d-flex align-items-center">
                <FaCreditCard className="me-2" />
                <Form.Control type="text" name="cardNumber" placeholder="Enter card number" required />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiration Date</Form.Label>
              <div className="d-flex align-items-center">
                <FaCalendarAlt className="me-2" />
                <Form.Control type="text" name="expiryDate" placeholder="MM/YY" required />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <div className="d-flex align-items-center">
                <FaLock className="me-2" />
                <Form.Control type="text" name="cvv" placeholder="Enter CVV" required />
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Cardholder Name</Form.Label>
              <div className="d-flex align-items-center">
                <RiVisaFill className="me-2" />
                <Form.Control type="text" name="cardHolderName" placeholder="Enter cardholder name" required />
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" type="submit">
                Confirm Payment
              </Button>
              <Button variant="secondary" onClick={handleClosePayment}>
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