import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Spinner, Alert } from "react-bootstrap";

const Packages = () => {
  const [tourPackages, setTourPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="packages-container">
      <Row xs={1} md={2} lg={3} className="g-4">
        {tourPackages.map((item, index) => (
          <Col key={index}>
            <Card className="custom-card">
              <Card.Img variant="top" src={item.image_url || "placeholder.jpg"} className="card-image" />
              <Card.Body>
                <Card.Title className="card-title">{item.destination || "Tour Package"}</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  {item.destination || "Unknown Destination"}
                </Card.Subtitle> */}
                <Card.Text className="card-text">
                  <strong>Duration : </strong>
                  {item.duration_days || "N/A"} days
                </Card.Text>
                {/* <Card.Text className="card-text">
                  <strong>Start Date : </strong>
                  {item.start_date || "N/A"}
                </Card.Text> */}
                {/* <Card.Text className="card-text">
                  <strong>End Date : </strong>
                  {item.end_date || "N/A"}
                </Card.Text> */}
                <Card.Text className="card-text">
                  <strong>Hotel : </strong>
                  {item.hotel_name || "N/A"}
                </Card.Text>
                {/* <Card.Text className="card-text">
                  <strong>Description : </strong>
                  {item.description ||
                    "If you are going to use a passage of Lorem Ipsum, be sure there isn’t anything embarrassing hidden in the text."}
                </Card.Text> */}
                <Card.Text className="card-text">
                  <strong>Price: </strong>
                  {item.price ? `$${item.price}` : "Contact for pricing"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Packages;