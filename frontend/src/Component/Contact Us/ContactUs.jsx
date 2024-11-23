import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill all required fields.");
      return;
    }

    emailjs
      .sendForm("service_he7ozdz", "template_2mi6de8", form.current, {
        publicKey: "S_6zovI0Rev-_0aTg",
      })
      .then(() => {
        toast.success("Message sent successfully!");
        e.target.reset();
        setFormData({ name: "", email: "", phone: "", message: "" });
      })
      .catch((err) => {
        toast.error("Failed to send the message. Please try again.");
        console.error(err);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    <Container className="my-5" >
      <h1 className="text-center mb-4" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>
        CONTACT <span style={{ color: "red" }}>US</span>
      </h1>
      <Row className="align-items-center">
        <Col md={6} className="mb-1">
          <Form ref={form} onSubmit={sendEmail} className="p-3 border rounded">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{ height: "40px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                style={{ height: "40px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                style={{ height: "40px" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="message"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleInputChange}
                required
                style={{ height: "120px" }}
              />
            </Form.Group>

            <Button variant="danger" type="submit" className="w-100">
              Send
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <div className="border rounded overflow-hidden">
            <iframe
              src={googleMapURL}
              width="100%"
              height="200"
              style={{ border: "none", height: "485px" ,marginTop:"1rem"}}
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