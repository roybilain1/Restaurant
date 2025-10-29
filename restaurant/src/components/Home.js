import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../styles/CarouselCustom.css';

import image1 from '../images/carousel-pictures/lebanese-food1.png';
import image2 from '../images/carousel-pictures/lebanese-food2.png';
import image3 from '../images/carousel-pictures/lebanese-food3.png';

const CarouselCustom = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`carousel-wrapper${isHovered ? ' hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        indicators={false}
        controls={true}
        interval={3000}
      >
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={image1}
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
      </Carousel>
    </div>
  );
};

export default CarouselCustom;