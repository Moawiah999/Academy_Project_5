import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userToken, user_id } from "../Redux/Reducers/userSlice";
import { useNavigate } from "react-router-dom";

const login = () => {
  // const [token,setToken]=useState('')
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = () => {
    axios
      .post(`http://localhost:5000/user/login`, { email, password })
      .then((result) => {
        dispatch(userToken(result.data.token));
        dispatch(user_id(result.data.userId));
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>login</div>
    </>
  )
};

export default login;
