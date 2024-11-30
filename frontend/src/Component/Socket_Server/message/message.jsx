import React, { useEffect } from "react";
import { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBBtn,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { BsCursorFill } from "react-icons/bs";
import { Button, Dropdown, Nav, NavDropdown, Spinner } from "react-bootstrap";
import axios from "axios";
const Message = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = localStorage.getItem("userId");
    axios
      .get(`http://localhost:5000/user`)
      .then((result) => {
        // console.log(result.data.result);
        setUserInfo(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    socket?.on("message", receivedMessage);
    return () => {
      socket.off("messaage", receivedMessage);
    };
  }, [allMessages]);
  const receivedMessage = (data) => {
    // console.log(data);
    setAllMessages([...allMessages, data]);
  };
  const sendMessage = () => {
    socket.emit("message", { to, from: user_id, message });
    setMessage("");
  };
  /* const fromUser = (messaage)=>{
    if (message.from === 1){

    }
  } */
  setTimeout(() => {
    setLoading(false);
    {
      localStorage.getItem("role_id") == 1 ? setTo(2) : setTo(1);
    }
    // console.log(to);
  }, 2000);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" style={{ color: "#ff5733" }} />
      </div>
    );
  }
  return (
    <>
      {/*  <div>
        <h2>Message</h2>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
            console.log(user_id);
          }}
        />
        <input
          type="text"
          placeholder="To"
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
        <button
          onClick={() => {
            sendMessage();
          }}
        >
          Send
        </button>
        {allMessages.length > 0 &&
          allMessages.map((message) => {
            return (
              <p>
                <small>
                  from {message.from}: TO :{message.to} {message.message}
                </small>
              </p>
            );
          })}
      </div> */}

      <>
        <MDBContainer
          fluid
          className="py-5"
          style={{ backgroundColor: "#eee" }}
        >
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard id="chat2" style={{ borderRadius: "15px" }}>
                <MDBCardHeader className="d-flex justify-content-between align-items-center p-3">
                  <h5
                    className="mb-0"
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
                    Chat With QuickReservePro Team{" "}
                  </h5>

                  {/* <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      Chat With
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      variant="danger"
                      size="sm"
                      rippleColor="dark"
                    >
                      {userInfo.map((ele, i) => {
                        return (
                          <>
                            <Dropdown.Item
                              onClick={() => {
                                setTo(ele.user_id);
                                console.log(ele.user_id);
                              }}
                            >
                              {ele.first_name + " " + ele.last_name}
                            </Dropdown.Item>
                          </>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown> */}
                </MDBCardHeader>

                {allMessages.length > 0 &&
                  allMessages.map((message) => {
                    return (
                      <>
                        {localStorage.getItem("userId") == 1 ? (
                          <MDBCardBody>
                            {message.from == user_id ? (
                              <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                  <span
                                    className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7" }}
                                  >
                                    {message.message}
                                  </span>
                                </div>
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                                  alt="avatar 1"
                                  style={{ width: "40px", height: "100%" }}
                                />
                              </div>
                            ) : (
                              <div className="d-flex flex-row justify-content-start">
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                  alt="avatar 1"
                                  style={{ width: "40px", height: "100%" }}
                                />
                                <div>
                                  <span className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                    {message.message}
                                  </span>
                                </div>
                              </div>
                            )}
                          </MDBCardBody>
                        ) : (
                          <MDBCardBody>
                            {message.from == user_id ? (
                              <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                <div>
                                  <span
                                    className="small p-2 ms-3 mb-1 rounded-3"
                                    style={{ backgroundColor: "#f5f6f7" }}
                                  >
                                    {message.message}
                                  </span>
                                </div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                  alt="avatar 1"
                                  style={{ width: "40px", height: "100%" }}
                                />
                              </div>
                            ) : (
                              <div className="d-flex flex-row justify-content-start">
                                <img
                                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                                  alt="avatar 1"
                                  style={{ width: "40px", height: "100%" }}
                                />
                                <div>
                                  <span className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                    {message.message}
                                  </span>
                                </div>
                              </div>
                            )}
                          </MDBCardBody>
                        )}
                      </>
                    );
                  })}
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  {localStorage.getItem("userId") == 1 ? (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm7KqMOxRFzRD_muNtnG-Gk0gOx7n5Uyn_PQn-aHQBUH6gMCwrbCnoAQ&s"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                  ) : (
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                      alt="avatar 3"
                      style={{ width: "40px", height: "100%" }}
                    />
                  )}
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Type message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></input>
                  <BsCursorFill
                    style={{ width: "35px", height: "100%" }}
                    onClick={(e) => {
                      sendMessage();
                      // setMessage("");
                    }}
                  />
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    </>
  );
};

export default Message;
