import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Spinner, Button, Modal } from "react-bootstrap";

const Packages = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
    <div className="packages-container">
      <Row xs={1} md={2} lg={3} className="g-4">
        {tourPackages.map((item, index) => (
          <Col key={index}>
            <Card className="custom-card" onClick={() => handleCardClick(item)}>
              <Card.Img
                variant="top"
                src={item.image_url}
                className="card-image"
              />
              <Card.Body>
                <Card.Title className="card-title">
                  {item.destination}
                </Card.Title>
                <Card.Text className="card-text">
                  <strong>Duration: </strong>
                  {item.duration_days} days
                </Card.Text>
                <Card.Text className="card-text">
                  <strong>Hotel: </strong>
                  {item.hotel_name}
                </Card.Text>
                <Card.Text className="card-text">
                  <strong>Price: </strong>
                  {item.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header
          closeButton
          style={{
            background: "linear-gradient(90deg, red, black)", 
            color: "white",
          }}
        >
          <Modal.Title>{selectedPackage?.destination}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="d-flex flex-column align-items-center">
          <div className="w-100">
            <p>
              <strong>Hotel:</strong> {selectedPackage?.hotel_name}
            </p>
            <p>
              <strong>Duration:</strong> {selectedPackage?.duration_days} days
            </p>
            <p>
              <strong>Price:</strong>{" "}
              {selectedPackage?.price
                ? `$${selectedPackage.price}`
                : "Contact for pricing"}
            </p>
            <p>
              <strong>Description:</strong> {selectedPackage?.description}
            </p>
          </div>
        </Modal.Body>

        <Modal.Footer
          style={{
            background: "linear-gradient(90deg, red, black)", 
            color: "white",
          }}
        >
          <Button
            variant="secondary"
            onClick={handleCloseModal}
            className="w-25"
          >
            Close
          </Button>
          <Button variant="primary" className="w-25">
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Packages;