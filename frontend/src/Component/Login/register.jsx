import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaGlobe } from "react-icons/fa";
import { useSpring, animated, useTrail } from "@react-spring/web";
import "./login.css";

function Register() {
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = () => {
    axios
      .post("http://localhost:5000/user/register", userInfo)
      .then((response) => {
        setMessage(response.data.message);
        setMessageType("success");
        console.log(response.data);
        
      })
      .catch((err) => {
        setMessage("An error occurred. Please try again.");
        setMessageType("error");
      });
  };

  const formAnimation = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(30px)" },
    config: { tension: 250, friction: 60 },
  });

  const formFieldsAnimation = useTrail(5, {
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(20px)" },
    delay: 200,
    config: { tension: 220, friction: 30 },
  });

  const imageAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 180, friction: 60 },
  });

  return (
    <Container
      className="register-container"
       >
      <Row className="justify-content-center align-items-center" >
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h3>Sign Up</h3>
          </div>

          {message && (
            <Alert variant={messageType === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}

          <animated.div style={formAnimation}>
            <Form>
              <animated.div style={formFieldsAnimation[0]}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, first_name: e.target.value , role_id : 2})
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={formFieldsAnimation[1]}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaUser />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, last_name: e.target.value })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={formFieldsAnimation[2]}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={formFieldsAnimation[3]}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={formFieldsAnimation[4]}>
                <Form.Group className="mb-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaGlobe />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"

                      placeholder="Country"
                      required
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, country: e.target.value })
                      }
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <Button
                variant="danger"
                className="w-100"
                onClick={handleRegister}
              >
                Submit
              </Button>

              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-link">
                  Login
                </Link>
              </div>
            </Form>
          </animated.div>
        </Col>

        <Col
          xs={12}
          md={6}
          lg={4}
          className="d-flex justify-content-center align-items-center"
        >
          <animated.img
            src="https://img.freepik.com/premium-photo/flying-around-world-concept-white-jet-passenger-s-airplane-near-earth-globe-white-background-3d-rendering_476612-7043.jpg?ga=GA1.1.579175181.1731767932&semt=ais_hybrid"
            alt="Registration Illustration"
            style={{
              marginRight:"-190px",
              width: "105%",
              height: "500px",
              borderRadius: "10px",
              transform: "translateX(30px)",
              ...imageAnimation,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
