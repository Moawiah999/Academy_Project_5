import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavbarPage from "./Component/NavBar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./Component/Home/Home";
import Hotels from "./Component/Hotels/Hotels";
import Flights from "./Component/Fligths/Flights";
import Packages from "./Component/Packages/Packages";
import MyProfile from "./Component/MyProfile/MyProfile";
import HotelsDetails from "./Component/HotelsDetails/HotelsDetails";
import Socket_message from "./Component/Socket_Server/socket_message";
import Login from "./Component/Login/login";
import Register from "./Component/Login/Register";
import Footer from "./Component/Footer/Footer";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavbarPage />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flight" element={<Flights />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/hotelsPage" element={<HotelsDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/message" element={<Socket_message />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
