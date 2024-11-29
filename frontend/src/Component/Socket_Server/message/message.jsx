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
import { Button } from "react-bootstrap";
const Message = ({ socket, user_id }) => {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  useEffect(() => {
    socket?.on("message", receivedMessage);
    return () => {
      socket.off("messaage", receivedMessage);
    };
  }, [allMessages]);
  const receivedMessage = (data) => {
    console.log(data);
    setAllMessages([...allMessages, data]);
  };
  const sendMessage = () => {
    socket.emit("message", { to, from: user_id, message });
  };
  /* const fromUser = (messaage)=>{
    if (message.from === 1){

    }
  } */
  return (
    <>
      <div>
        <h2>Message</h2>
        <input
          type="text"
          placeholder="Message"
          onChange={(e) => {
            setMessage(e.target.value);
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
      </div>

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
                  <h5 className="mb-0">Chat</h5>
                  <Button variant="danger" size="sm" rippleColor="dark">
                    {user_id}
                  </Button>
                </MDBCardHeader>

                {allMessages.length > 0 &&
                  allMessages.map((message) => {
                    return (
                      <>
                        <MDBCardBody>
                          {message.from == 1 ? (
                            <div className="d-flex flex-row justify-content-start">
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                alt="avatar 1"
                                style={{ width: "40px", height: "100%" }}
                              />
                              <div>
                                <p
                                  className="small p-2 ms-3 mb-1 rounded-3"
                                  style={{ backgroundColor: "#f5f6f7" }}
                                >
                                  {message.from} : {message.message}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                              <div>
                                <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                                  {message.message}
                                </p>
                              </div>
                              <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                                alt="avatar 1"
                                style={{ width: "40px", height: "100%" }}
                              />
                            </div>
                          )}
                        </MDBCardBody>
                      </>
                    );
                  })}
                <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    alt="avatar 3"
                    style={{ width: "40px", height: "100%" }}
                  />
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Type message"
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                  ></input>
                  <BsCursorFill
                    style={{ width: "35px", height: "100%" }}
                    onClick={() => {
                      sendMessage();
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
