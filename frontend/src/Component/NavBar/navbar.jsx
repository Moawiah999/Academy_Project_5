import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "antd";
import Button from "react-bootstrap/Button";
import "./navbar.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavbarPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <>
        {["sm"].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-white-mb-3">
            <Container fluid>
              <Navbar.Brand
                className="title"
                onClick={() => {
                  navigate("/home");
                }}
              >
                QuickReservePro
              </Navbar.Brand>
              <img className="logo" src="\public\updateLogo.png" />

              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${expand}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">HOME</Nav.Link>
                    <Nav.Link href="#action2">ABOUT</Nav.Link>
                    <Nav.Link href="#action2">HOTELS</Nav.Link>
                    <Nav.Link href="#action2">FLIGHTS</Nav.Link>
                    <Nav.Link href="#action2">PACKAGES</Nav.Link>
                    <Nav.Link href="#action2">CONTACT US</Nav.Link>
                  </Nav>
                  {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    </>
  );
};

export default NavbarPage;
