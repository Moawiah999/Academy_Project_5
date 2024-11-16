import React from 'react'
import NavbarPage from './Component/NavBar/navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './Component/Home/home';



const App = () => {
  return (<>
    <NavbarPage/>
    <Home/> 
  </>
  )
}

export default App