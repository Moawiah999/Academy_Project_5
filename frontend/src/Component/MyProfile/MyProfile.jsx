import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>MyProfile</div>
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
    </>
  );
};

export default MyProfile;
