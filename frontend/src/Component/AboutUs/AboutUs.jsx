import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              lineHeight: "1.2",
              color: "#000",
            }}
          >
            ABOUT <span style={{ color: "red" }}>US</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: "1.8",
              color: "#555",
              marginBottom: "20px",
            }}
          >
            Quick Reserve Pro, established in 2023, specializes in seamless
            reservation solutions for hotels, flights, and travel packages. Our
            mission is to provide a user-friendly platform that simplifies
            bookings, ensuring efficiency, convenience, and satisfaction for both
            businesses and customers. By offering a comprehensive range of travel
            services in one place, we aim to revolutionize the way people plan and
            book their trips, making the process faster, smoother, and more reliable
            for all involved.
          </p>
          <Button
           
            variant="danger"
          >
            Read More
          </Button>
        </Col>

        <Col md={6}>
          <div>
            <img
              src="https://images.pexels.com/photos/8828448/pexels-photo-8828448.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="About Us"
              className="img-fluid"
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "25px",
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;