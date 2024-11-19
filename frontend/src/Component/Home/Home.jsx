import React from 'react'
import ImageSlider from '../imageslider/ImageSlider';
import AboutUs from '../AboutUs/AboutUs';
import ContactUs from '../Contact Us/ContactUs';
import Flights from '../Fligths/Flights';
const Home = () => {
  return (
    <>
  <div>
    
  <ImageSlider/>
  <AboutUs/>
  {/* <ContactUs/> */}
  </div>
  <ContactUs/> 
  </>

  )
}


export default Home;