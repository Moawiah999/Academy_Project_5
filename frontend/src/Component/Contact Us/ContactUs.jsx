import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ContactUs = () => {
  const [latitude , setLatitude] = useState(null);
  const [logitude , setLogitude] = useState(null);

  useEffect(()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLatitude(position.coords.latitude);
                setLogitude(position.coords.longitude);

            },
                
            
        )
    }
  },[]);
  const googleMapURL = latitude && logitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`
    : `https://www.google.com/maps?q=Eiffel+Tower+Paris&hl=es;z=14&output=embed`;

  return (
    <Container className="mt-5"  style={{ marginTop: '300px' }}>
    <h1
            style={{
              fontWeight: "bold",
              fontSize: "2.5rem",
              lineHeight: "1.2",
              color: "#000",
            }}
            className="text-center">
            ABOUT <span style={{ color: "red" }}>US</span>
          </h1>
      <Row>
        {/* Form Section */}
        <Col md={6}>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" style={{
           
        height:"50px"
            }}/>
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write your message here" />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>

        {/* Map Section */}
        <Col md={6}>
          <div className="map-container" style={{ marginBlock : "30px",height: '380px', border: '1px solid #ddd' }}>
            <iframe
              src={googleMapURL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;