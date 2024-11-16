import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

const Home = () => {
  return (
  <>
    <Carousel>
      <Carousel.Item interval={1000}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtY0pssXxkH_76eqltSvsCmUcFZECasnffA&s' />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        {/* <ExampleCarouselImage src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtY0pssXxkH_76eqltSvsCmUcFZECasnffA&s' text="Second slide" /> */}
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </>
  )
}

export default Home