


import React from "react";
import ImageSlider from "../imageslider/ImageSlider";
import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../Contact Us/ContactUs";
import Hotels from "../Hotels/Hotels";
const Home = () => {
  return (
    <>
      <div>
        <ImageSlider />
        <AboutUs />
        <Hotels />
        {/* <ContactUs/> */}
      </div>
      <ContactUs />
    </>
  );
};

export default Home;
