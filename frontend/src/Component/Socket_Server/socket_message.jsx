import React, { useState, useEffect } from "react";
import socketInit from "./socket_server";
import Message from "./message/message";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

const Socket_message = () => {
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  /* const { token, user_id } = useSelector((state) => {
    console.log(state);
    return { token: state.user.token , user_id : state.user.userId };
  }); */

  useEffect(() => {
    socket?.on("connect", () => {
      console.log(true);
      setIsConnected(true);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
      console.log(false);
      setIsConnected(false);
    });
    return () => {
      socket?.close();
      socket?.removeAllListeners();
      setIsConnected(false);
    };
  }, [socket]);
  return (
    <>
      <div>socket_message</div>
      {/* <input
        type="text"
        placeholder="user_id"
        onChange={(e) => {
          setUser_id(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="token"
        onChange={(e) => {
          setToken(e.target.value);
        }}
      /> */}
      <Button
        variant="danger"
        onClick={() => {
          {
            localStorage.getItem("token") ? setToken(true) : setToken(false);
          }
          setUser_id(localStorage.getItem("userId"));
          setSocket(socketInit({ user_id, token }));
        }}
      >
        Let's Chat
      </Button>
      {isConnected && <Message socket={socket} user_id={user_id} />}
    </>
  );
};

export default Socket_message;
