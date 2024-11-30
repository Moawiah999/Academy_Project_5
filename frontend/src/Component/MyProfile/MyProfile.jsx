import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
} from "mdb-react-ui-kit";

const MyProfile = () => {
  let avatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s";
  avatar =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/user/${id}`)
      .then((result) => {
        console.log(result.data.result);
        setUserInfo(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
<<<<<<< HEAD
      {userInfo.map((ele, i) => (
        <section key={i} style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                      className="rounded-circle"
                      fluid
                      style={{ width: "150px", marginTop: "30px" }}
                    />
                    <p
                      className="text-muted mb-4"
                      style={{ fontWeight: "bold", marginTop: "20px" }}
                    >
                      {ele.first_name + " " + ele.last_name}{" "}
                    </p>
                    <p className="text-muted mb-1">Full Stack Developer</p>

                    <p className="text-muted mb-4">{ele.country}</p>
                    <div className="d-flex justify-content-center mb-2"></div>
                    <Button
                      rounded
                      size="md"
                      variant="danger"
                      style={{ marginBottom: "0px" }}
                      onClick={() => {
                        navigate("/message");
                      }}
                    >
                      Message now
                    </Button>
                    <Button
                      rounded
                      size="md"
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={handleLogout}
                    >
                      LogOut
                    </Button>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText className="font-weight-bold">
                          First Name
                        </MDBCardText>
                        <hr style={{width:"213px"}} />

                        <MDBCardText className="font-weight-bold">
                          Last Name
                        </MDBCardText>
                      </MDBCol>

                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.first_name}
                        </MDBCardText>
                        <hr />

                        <MDBCardText className="text-muted">
                          {ele.last_name}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText className="font-weight-bold">
                          Email
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.email}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText className="font-weight-bold">
                          Country
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.country}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      ))}
=======
      {/* <Form
        className="mb-3"
        style={{ marginLeft: "200px", marginBottom: "10px" }}
      >
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "17px",
            textTransform: "uppercase",
            background: "linear-gradient(90deg, red, black)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
            letterSpacing: "1px",
          }}
        >
          My Profile
        </div>
      </Form> */}
      {/* <Form
        className="mb-3"
        style={{ marginLeft: "150px", marginBottom: "10px" }}
      >
        {userInfo.map((ele, i) => {
          return (
            <div>
              <p>
                <strong
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, red, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    letterSpacing: "1px",
                  }}
                >
                  First Name :
                </strong>
                {" " + ele.first_name}
              </p>
              <p>
                <strong
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, red, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    letterSpacing: "1px",
                  }}
                >
                  Last Name :
                </strong>
                {" " + ele.last_name}
              </p>
              <p>
                <strong
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, red, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    letterSpacing: "1px",
                  }}
                >
                  Country :
                </strong>
                {" " + ele.country}
              </p>
              <p>
                <strong
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    fontSize: "17px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg, red, black)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    letterSpacing: "1px",
                  }}
                >
                  Email :
                </strong>
                {" " + ele.email}
              </p>
            </div>
          );
          })}
          </Form>
      <Button
        variant="danger"
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("role_id");
          navigate("/login");
        }}
      >
        LogOut
      </Button>
           */}
      {userInfo.map((ele, i) => {
        return (
          <>
            <div className="vh-100" style={{ backgroundColor: "#eee" }}>
              <MDBContainer className="container py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol md="12" xl="4">
                    <MDBCard style={{ borderRadius: "15px" }}>
                      <MDBCardBody className="text-center">
                        {localStorage.getItem("userId") == 1 ? (
                          <div className="mt-3 mb-4">
                            <MDBCardImage
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                              className="rounded-circle"
                              fluid
                              style={{ width: "100px" }}
                            />
                          </div>
                        ) : (
                          <div className="mt-3 mb-4">
                            <MDBCardImage
                              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                              className="rounded-circle"
                              fluid
                              style={{ width: "100px" }}
                            />
                          </div>
                        )}
                        <MDBTypography tag="h4">
                          {ele.first_name + " " + ele.last_name}
                        </MDBTypography>
                        <MDBCardText className="text-muted mb-4">
                          {ele.email} <span className="mx-2">|</span>{" "}
                          <span>{ele.country}</span>
                        </MDBCardText>
                        {/* <div className="mb-4 pb-2">
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="facebook" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating className="mx-1">
                    <MDBIcon fab icon="twitter" size="lg" />
                  </MDBBtn>
                  <MDBBtn outline floating>
                    <MDBIcon fab icon="skype" size="lg" />
                  </MDBBtn>
                </div> */}
                        <Button
                          rounded
                          size="lg"
                          variant="danger"
                          style={{ marginBottom: "0px" }}
                          onClick={() => {
                            navigate("/message");
                          }}
                        >
                          Message now
                        </Button>
                        <br />
                        <p>
                          <Button
                            rounded
                            size="lg"
                            variant="danger"
                            style={{ marginTop: "15px" }}
                            onClick={() => {
                              localStorage.removeItem("token");
                              localStorage.removeItem("userId");
                              localStorage.removeItem("role_id");
                              navigate("/login");
                            }}
                          >
                            LogOut
                          </Button>
                        </p>
                        {/* <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">4751</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                  </div>
                </div> */}
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          </>
        );
      })}
>>>>>>> 910b6d1a0b461c83883ecb3914a70c7f4042275a
    </>
  );
};

export default MyProfile;
