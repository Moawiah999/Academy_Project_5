import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import './HotelsDetails.css'

const HotelsDetails = () => {
  const [hotelDetails, setHotelDetails] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotels/")
      .then((result) => {
        console.log(result.data.result);
        setHotelDetails(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div>HotelsDetails</div>
      <div className="slider">
        <Carousel className="slider">
          <Carousel.Item interval={5000}>
            <img
              src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="First slide"
              className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Second slide"
              className="d-block w-100"
            />
          </Carousel.Item>

          <Carousel.Item interval={5000}>
            <img
              src="https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg?auto=compress&cs=tinysrgb&w=400"
              className="d-block w-100"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default HotelsDetails;
