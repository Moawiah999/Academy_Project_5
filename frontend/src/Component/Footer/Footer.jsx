import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { Row, Col, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-white text-center py-5">
      <Container>
        <Row>
          <Col md={8} className="text-md-start">
            <h5>Quick Reserve Pro</h5>
            <p>Your seamless reservation solution for hotels, flights, and travel packages. Simplifying travel for businesses and customers alike.</p>
            <p>&copy; 2024 Quick Reserve Pro. All Rights Reserved.</p>
          </Col>

        

          <Col md={4} className="text-md-end">
            <h5>Contact Us</h5>
            <div>
              <p><FaPhoneAlt /> <a href="tel:+96279956558" className="text-white">+96279956558</a></p>
              <p><FaEnvelope /> <a href="mailto:support@quickreservepro.com" className="text-white">support@quickreservepro.com</a></p>
              <p><FaMapMarkerAlt /> Amman, Jordan</p>
            </div>

            <div className="mt-3">
              <a href="https://facebook.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-white mx-2" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>

       
      </Container>
    </footer>
  );
};

export default Footer;