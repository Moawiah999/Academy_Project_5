import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const MyProfile = () => {
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
  return (
    <>
      <Form
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
      </Form>
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
                        <div className="mt-3 mb-4">
                          <MDBCardImage
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                            className="rounded-circle"
                            fluid
                            style={{ width: "100px" }}
                          />
                        </div>
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
    </>
  );
};

export default MyProfile;
/* 
<MDBBtn color="light" size="lg" rounded className="float-end">
              Send
            </MDBBtn> */
