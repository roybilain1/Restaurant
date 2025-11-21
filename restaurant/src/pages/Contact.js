import React from 'react';
import '../styles/contact.css';

const phoneNumber = '+96171237881';
const whatsappLink = `https://wa.me/${phoneNumber.replace('+', '')}`;
const instagramLink = 'https://instagram.com/';
const facebookLink = 'https://facebook.com/';
const xLink = 'https://x.com/';

const Contact = () => (
  <div className="contact-section">
    <h2>Contact Us</h2>
    <div className="contact-methods">
        {/* rel="noopener noreferrer"  is made to keep the website safer when opening links in new tabs */}
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-box whatsapp"> 
        <i className="bi bi-whatsapp"></i>
        <span>WhatsApp</span>
      </a>
      <a href={`tel:${phoneNumber}`} className="contact-box phone">
        <i className="bi bi-telephone"></i>
        <span>Call Us: {phoneNumber}</span>
      </a>
      <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="contact-box instagram">
        <i className="bi bi-instagram"></i>
        <span>Instagram</span>
      </a>
      <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="contact-box facebook">
        <i className="bi bi-facebook"></i>
        <span>Facebook</span>
      </a>
      <a href={xLink} target="_blank" rel="noopener noreferrer" className="contact-box x">
        <i className="bi bi-twitter-x"></i>
        <span>X (Twitter)</span>
      </a>
    </div>
  </div>
);

export default Contact;