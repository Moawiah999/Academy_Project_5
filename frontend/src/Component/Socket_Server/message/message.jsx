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
  );
};

export default Message;
