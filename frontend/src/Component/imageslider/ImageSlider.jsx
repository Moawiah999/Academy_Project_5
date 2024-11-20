import React from 'react';
import './ImageSlider.css';
import { Carousel } from 'react-bootstrap';

const ImageSlider = () => {
  return (
    <div className="slider">
      <Carousel className="slider p-3">
        <Carousel.Item interval={5000}>
          <img
            src="https://images.pexels.com/photos/105831/pexels-photo-105831.jpeg"
            alt="First slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg"
            alt="Second slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg"
            alt="Third slide"
            className="d-block w-100"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;