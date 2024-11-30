import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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
                      style={{ width: "150px" , marginTop:"35px" }}
                    />
                      <p className="text-muted mb-4">
                      {ele.first_name+" "+ele.last_name}
                    </p>
                    <p className="text-muted mb-1">Full Stack Developer</p>
                 
                    <div className="d-flex justify-content-center mb-2" style={{marginTop:"45px"}}>
                     
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
                            style={{ marginLeft: "15px" }}
                            onClick={()=>{
                              localStorage.removeItem("token");
                            localStorage.removeItem("userId");
                            localStorage.removeItem("role_id");
                            navigate("/login");
                            }}
                          >
                            LogOut
                          </Button>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8" >
                <MDBCard className="mb-4">
                  <MDBCardBody style={{marginTop :"25px"}}>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>First name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.first_name }
                        </MDBCardText>
                      </MDBCol>

                      <hr />
                      <MDBCol sm="3">
                        <MDBCardText>Last name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.last_name }
                        </MDBCardText>
                      </MDBCol>
                      {/* <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {ele.first_name + " " + ele.last_name}
                        </MDBCardText>
                      </MDBCol> */}
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
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
                        <MDBCardText>Country</MDBCardText>
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
    </>
  );
};

export default MyProfile;
