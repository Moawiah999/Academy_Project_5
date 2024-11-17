import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavbarPage from "./Component/NavBar/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Component/Home/Home";
import "./Component/AboutUs/AboutUs.css";
import "./Component/imageslider/ImageSlider.css";
import Hotels from "./Component/Hotels/Hotels";
import Flights from "./Component/Fligths/Flights";
import Packages from "./Component/Packages/Packages";

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavbarPage />

      {/* <Home /> */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flight" element={<Flights />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
    </>
  );
};

export default App;
