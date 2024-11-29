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
} from "mdb-react-ui-kit";

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
        <MDBContainer className="py-5">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="8" lg="6" xl="4">
              <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
                <MDBCardHeader
                  className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                  style={{
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px",
                  }}
                >
                  <MDBIcon fas icon="angle-left" />
                  <p className="mb-0 fw-bold">Live chat</p>
                  <MDBIcon fas icon="times" />
                </MDBCardHeader>

                <MDBCardBody>
                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div
                      className="p-3 ms-3"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "rgba(57, 192, 237,.2)",
                      }}
                    >
                      <p className="small mb-0">
                        Hello and thank you for visiting MDBootstrap. Please
                        click the video below.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div
                      className="p-3 me-3 border"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#fbfbfb",
                      }}
                    >
                      <p className="small mb-0">
                        Thank you, I really like your product.
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>

                  <MDBTextArea
                    className="form-inline"
                    placeholder="Type your message"
                    id="textAreaExample"
                    rows={3}
                  />
                  <MDBBtn
                    color="danger"
                    size="md"
                    rounded
                    className="float-end"
                  >
                    Send
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </>
    </>
  );
};

export default Message;
