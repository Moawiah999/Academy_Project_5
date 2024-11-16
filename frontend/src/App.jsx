import React from 'react'
import NavbarPage from './Component/NavBar/navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Component/Home/Home'
import './Component/AboutUs/AboutUs.css'; 
import './Component/imageslider/ImageSlider.css'; 



const App = () => {
  return (<>
    <NavbarPage/>

    <Home/> 
    
  </>
  )
}

export default App