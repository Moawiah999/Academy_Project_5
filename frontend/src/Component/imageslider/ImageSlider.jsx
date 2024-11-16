import React from 'react';
import './ImageSlider.css';
import { Carousel } from 'react-bootstrap'; 

const ImageSlider = () => {
  return (
    <div className="slider">
      <Carousel className="slider">
        <Carousel.Item interval={1000}>
          <img
            src="https://themewagon.github.io/keto/images/about.png"
            alt="First slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <img
            src="https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Second slide"
            className="d-block w-100"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtY0pssXxkH_76eqltSvsCmUcFZECasnffA&s"
            alt="Third slide"
            className="d-block w-100"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default ImageSlider;