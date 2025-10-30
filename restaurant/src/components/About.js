import React from 'react';
import '../styles/about.css';
import aboutImage from '../images/chez-roy-restaurant.png';

const About = () => (
  <section className="about-hero">
    <div className="about-hero-content">
      <div className="about-hero-text">
        <h1>Welcome to Chez Roy</h1>
        <p>
          Discover the heart and soul of Lebanese cuisine at Chez Roy. 
          Our story began with a dream to share authentic flavors and warm hospitality. 
          From cherished family recipes to a vibrant dining experience, we invite you to enjoy the tradition, taste, and spirit of Lebanon in every bite.
        </p>
      </div>
      <div className="about-hero-image">
        <img src={aboutImage} alt="Chez Roy Restaurant" />
      </div>
    </div>
  </section>
);

export default About;