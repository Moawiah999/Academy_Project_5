import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Modal, Spinner, Row, Col } from "react-bootstrap";
import './Packages.css';

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

  const shortDiscription = (description) => {
    const words = description.split(" ");
    return words.slice(0, 4).join(" ") + " ...";
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
    <div className="packages-container" style={{ fontFamily: 'Roboto, sans-serif' }}>
      <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '80vh' }}>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-center" style={{ gap: '70px' }}>
          {tourPackages.map((item, index) => (
            <Col key={index} className="d-flex justify-content-center">
              <Card
                className="custom-card"
                onClick={() => handleCardClick(item)}
                style={{
                  cursor: "pointer",
                  maxWidth: "350px",
                  margin: "0 auto",
                  marginBottom: "-30px"
                }}
              >
                <Card.Img
                  variant="top"
                  src={item.image_url}
                  alt={item.destination}
                  className="img-fluid"
                />
                <Card.Body style={{ background: "#f8f9fa" }}>
                  <Card.Title className="text-success">{item.destination}</Card.Title>
                  <Card.Text className="text-muted">
                    <strong>Duration: </strong>{item.duration_days} days
                    <br />
                    <strong>Price: </strong>
                    <span className="text-success">${item.price}</span>
                    <p><strong>Description:</strong> {shortDiscription(item.description)}</p>
                    <Button variant="danger">Confirm Booking</Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>{selectedPackage?.destination}</Modal.Title>
        </Modal.Header>

        <Modal.Body >
          {selectedPackage && (
            <>
              <p>
                <strong>Hotel :</strong> {selectedPackage?.hotel_name}
              </p>
              <p>
                <strong>Duration :</strong> {selectedPackage?.duration_days} days
              </p>
              <p>
                <strong>Price :</strong> {selectedPackage?.price}
              </p>
              <p>
                <strong>Description :</strong> {selectedPackage?.destination}
              </p>
              <p>
                <strong>Departure Time:</strong>{selectedPackage?.description}
              </p>
              
            </>
          )}

 </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="danger">Confirm Booking</Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Packages;