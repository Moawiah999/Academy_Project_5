import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "./contactUs.css";

const ContactUs = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_he7ozdz", "template_2mi6de8", form.current, {
        publicKey: "S_6zovI0Rev-_0aTg",
      })
      .then(() => {
        console.log("Message Sent Successfully");
        e.target.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const errors = {};

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.phone) errors.phone = "Phone number is required.";
    if (!formData.message) errors.message = "Message is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      toast.success("Thanks for your opinion!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      toast.error("Please fill all required fields.");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }
  }, []);

  const googleMapURL =
    latitude && longitude
      ? `https://www.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&output=embed`
      : `https://www.google.com/maps?q=Eiffel+Tower+Paris&hl=es;z=14&output=embed`;

  return (
    <Container className="mt-5" style={{ marginTop: "300px" }}>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "2.5rem",
          lineHeight: "1.2",
          color: "#000",
        }}
        className="text-center"
      >
        CONTACT <span style={{ color: "red" }}>US</span>
      </h1>
      <div className="form-container">
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label for="user_name">Name</label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            placeholder="Enter your name"
            required
          />
          <br />
          <label for="user_email">Email</label>
          <input
            type="email"
            id="user_email"
            name="user_email"
            placeholder="Enter your email"
            required
          />
          <br />
          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            required
          />
          <br />
          <Button variant="danger" type="submit" value="Send" className="mt-3">
            Send
          </Button>
          {/* <input type="submit" value="Send" className="submit-btn" /> */}
          <br />
        </form>
      </div>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                style={{ height: "50px" }}
                isInvalid={!!formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                isInvalid={!!formErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                isInvalid={!!formErrors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Write your message here"
                required
                isInvalid={!!formErrors.message}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="danger" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <div
            className="map-container"
            style={{
              marginBlock: "30px",
              height: "380px",
              border: "1px solid #ddd",
            }}
          >
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
      <ToastContainer />
    </Container>
  );
};

export default ContactUs;
