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

          <img style={{ "border-radius": "25px" }}
            src="https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg"
            alt="First slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="/images\home_image_2.jpeg"
          <img style={{ "border-radius": "25px" }}
            src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg"
            alt="Second slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={5000}>
          <img
            src="/images\home_image_3.jpg
          <img style={{ "border-radius": "25px" }}
            src="https://themewagon.github.io/keto/images/banner3.jpg"
            alt="Third slide"
            className="d-block w-100"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;