import React from 'react';
import './ImageSlider.css';
import { Carousel } from 'react-bootstrap';

const ImageSlider = () => {
  return (
    <div className="slider">
      <Carousel className="slider p-2" style={{"borderRadius":"40px"}}>
        <Carousel.Item interval={5000}>
          <img
            src="/images\home_image_1.jpeg"
            alt="First slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="/images\home_image_2.jpeg"
            alt="Second slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="/images\home_image_3.jpg
"
            alt="Third slide"
            className="d-block w-100"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;