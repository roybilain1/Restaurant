import React, { useState } from 'react';
import '../styles/about.css';
import aboutImage from '../images/chez-roy-restaurant.png';

const About = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault(); // Here we can handle the form submission.
        setSubmitted(true);
    };

    return (
        <div>
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

            <div className='about-rating-section'>
                <h2>Rate Your Experience</h2>
                <form onSubmit={handleSubmit} className="about-rating-form">
                    <div className="star-rating">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`star ${i < (hover || rating) ? 'filled' : ''}`}
                                onClick={() => setRating(i + 1)}
                                onMouseEnter={() => setHover(i + 1)}
                                onMouseLeave={() => setHover(0)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    <textarea
                        className="comment-box"
                        placeholder="Leave your comment here..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                    />
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
                {submitted && (
                    <div className="thank-you">
                        <p>Thank you for your feedback!</p>
                    </div>
                )}
            </div>

        </div>

    );
};

export default About;