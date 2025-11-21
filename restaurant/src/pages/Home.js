import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/CarouselCustom.css";
import { useNavigate } from 'react-router-dom';
import "./Menu";
import React, { useState } from 'react';

import image1 from "../images/carousel-pictures/lebanese-food1.png";
import image2 from "../images/carousel-pictures/lebanese-food2.png";
import image3 from "../images/carousel-pictures/lebanese-food3.png";

import menu1 from "../images/menu/machewe/mixed-machewe.png";
import menu2 from "../images/menu/hot-mezza/rkakat.png";
import menu3 from "../images/menu/machewe/kafta.png";
import menu4 from "../images/menu/cold-mezza/tabbouleh.png";

const Home = () => {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();


  return (
    <div className="home-page">

      {/* HERO / CAROUSEL SECTION */}
      <section
        className={`carousel-wrapper${isHovered ? ' hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >

        <Carousel indicators={false} controls={true} interval={3000}>
          <Carousel.Item>
            <img className="d-block w-100 hero-img" src={image1} alt="Delicious Lebanese Dish" />
            <Carousel.Caption>
              <h1 className="hero-title">Authentic Lebanese Taste</h1>
              <p className="hero-subtitle">Experience the warmth of Lebanon in every bite.</p>
              <button
                className="carousel-menu-btn"
                onClick={() => navigate('/Menu')}
              >
                Explore Menu
              </button>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 hero-img" src={image2} alt="Lebanese Mezze" />
            <Carousel.Caption>
              <h1 className="hero-title">Fresh. Flavorful. Lebanese.</h1>
              <button
                className="carousel-menu-btn"
                onClick={() => navigate('/Menu')}
              >
                Order Now
              </button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 hero-img" src={image3} alt="Lebanese Grill" />
            <Carousel.Caption>
              <h1 className="hero-title">Grilled to Perfection</h1>
              <button
                className="carousel-menu-btn"
                onClick={() => navigate('/Menu')}
              >
                Explore Menu
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>

      {/* FEATURED MENU SECTION */}
      <section className="featured-menu py-5">
        <Container>
          <h2 className="text-center mb-4">Our Signature Dishes</h2>
          <Row>
            {[menu1, menu2, menu3, menu4].map((img, idx) => (
              <Col key={idx} md={3} sm={6} xs={12} className="mb-4">
                <div className="menu-card">
                  <img src={img} alt={`menu item ${idx}`} className="menu-img" />
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <button
                className="carousel-menu-btn"
                onClick={() => navigate('/Menu')}
              >
                See Full Menu
              </button>
          </div>
        </Container>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section py-5 text-center">
        <Container>
          <h2>About Us</h2>
          <p className="lead">
            We bring the heart of Lebanese cuisine straight to your table.
            From traditional mezze to sizzling grills, each dish tells a story of flavor and passion.
          </p>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section py-5 text-center bg-light">
        <Container>
          <h2>Get In Touch</h2>
          <p>We’d love to hear from you! Book a table, order, or just say hi.</p>
          <button
                className="carousel-menu-btn"
                onClick={() => navigate('/Menu')}
              >
                Contact Us
              </button>
        </Container>
      </section>

    </div>
  );
};

export default Home;





