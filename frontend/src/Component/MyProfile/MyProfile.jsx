import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
      <Form
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
      </Form>
    </>
  );
};

export default MyProfile;
