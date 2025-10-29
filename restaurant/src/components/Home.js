import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/CarouselCustom.css'; // Create this CSS file

import image1 from '../images/carousel-pictures/lebanese-food1.png';
import image2 from '../images/carousel-pictures/lebanese-food2.png';
import image3 from '../images/carousel-pictures/lebanese-food3.png';

const CarouselCustom = () => (
  <div className="carousel-wrapper">
    <Carousel indicators={false} controls={true} interval={3000}>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src= {image1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={image2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={image3}
          alt="third slide"
        />
      </Carousel.Item>
      {/* Add more items as needed */}
    </Carousel>
  </div>
);

export default CarouselCustom;
 

