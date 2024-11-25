import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken, setUserId } from "../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useSpring, animated, useTrail } from "@react-spring/web";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { token, userId } = useSelector((state) => {
    return {
      token: state.user.token,
      userId: state.user.userId,
    };
  });

  const handleLogin = () => {
    axios
      .post("http://localhost:5000/user/login", { email, password })
      .then((result) => {
        dispatch(setUserToken(result.data.token));
        dispatch(setUserId(result.data.userId));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("ahmad", tokenResponse);

      if (tokenResponse) {
        axios
          .post(`http://localhost:5000/user/login`, {
            token: tokenResponse.access_token,
          })
          .then((response) => {
            dispatch(setUserToken(response.data.token));
            dispatch(userId(response.data.userId));
            navigate("/home");
          })
          .catch((err) => {
            console.log("Google login failed", err);
          });
      }
    },
    onError: (error) => {
      console.log("Google login Failed", error);
    },
  });

  const containerProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  const trailProps = useTrail(5, {
    opacity: 1,
    from: { opacity: 0 },
    delay: 300,
    config: { tension: 200, friction: 20 },
  });

  const imageAnimation = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    config: { tension: 180, friction: 60 },
  });

  return (
    <Container className="login-container" fluid="md">
      <Row
        className="justify-content-start align-items-center"
        style={{ minHeight: "72vh" }}
      >
        <Col xs={12} md={6} lg={4} className="offset-lg-2">
          <div className="login-form ms-5">
            <h2 className="text-center mb-3">Login</h2>

            <Form>
              <animated.div style={trailProps[0]}>
                <Form.Group controlId="email">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaEnvelope />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => dispatch(setEmail(e.target.value))}
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={trailProps[1]}>
                <Form.Group controlId="password" className="mt-3">
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLock />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                    />
                  </InputGroup>
                </Form.Group>
              </animated.div>

              <animated.div style={trailProps[2]}>
                <Button
                  variant="danger"
                  className="w-100 mt-4"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </animated.div>
            </Form>
            <animated.div style={trailProps[4]}>
              <Button
                variant="outline-danger"
                className="w-100 mt-3"
                onClick={loginWithGoogle}
              >
                Sign in with Google 🚀
              </Button>
            </animated.div>

            <animated.div style={trailProps[3]}>
              <div className="text-center mt-3">
                <p>Don't have an account?</p>
                <Link to="/register">Sign up</Link>
              </div>
            </animated.div>
          </div>
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
              width: "105%",
              height: "500px",
              marginRight: "-190px",
              borderRadius: "10px",
              transform: "translateX(30px)",
              ...imageAnimation,
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
