import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/about.css';
import aboutImage from '../images/chez-roy-restaurant.png';

const About = () => {
    const { user, isAuthenticated, getToken } = useContext(UserContext);
    const navigate = useNavigate();
    
    // the rating/comment section 
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [exampleComments, setExampleComments] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch comments from API
    useEffect(() => {
        fetchComments();
    }, []);
    
    // Auto-hide thank you message after 3 seconds
    useEffect(() => {
        if (submitted) {
            const timer = setTimeout(() => {
                setSubmitted(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    const handleSubmit = async () => {
        // Check if user is logged in
        if (!isAuthenticated) {
            alert('Please login to submit a comment');
            navigate('/login');
            return;
        }
        
        // Validate rating and comment
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        
        if (comment.trim() === '') {
            alert('Please write a comment');
            return;
        }
        
        setLoading(true);
        
        try {
            // Send comment to backend with authentication token
            const token = getToken();
            const response = await fetch('https://dynamic-energy-production.up.railway.app/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ rating, comment })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Don't add to local state, just refresh from backend
                setSubmitted(true);
                setComment('');
                setRating(0);
                
                // Refresh comments from backend to get the new comment
                fetchComments();
            } else {
                alert(data.error || 'Failed to submit comment');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    // Move fetchComments outside useEffect so we can reuse it
    const fetchComments = async () => {
        try {
            const response = await fetch('https://dynamic-energy-production.up.railway.app/api/comments');
            const commentsData = await response.json();
            setExampleComments(commentsData);
            console.log('Fetched comments:', commentsData);
        } catch (error) {
            console.error('Error fetching comments:', error);
            // Fallback to hardcoded comments if API fails
            setExampleComments([
                { name: 'Layla', rating: 5, comment: 'Amazing food and atmosphere! Highly recommended.' },
                { name: 'Karim', rating: 4, comment: 'Great service, delicious mezza.' },
                { name: 'Maya', rating: 5, comment: 'Authentic Lebanese flavors, will come again!' },
                { name: 'Omar', rating: 3, comment: 'Good experience, but the place was a bit crowded.' },
                { name: 'Nadine', rating: 4, comment: 'Loved the desserts and friendly staff.' },
            ]);
        }
    };

    return (
        <div>
            {/* picture and text about the restaurant */}
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
            {/* picture and text about the restaurant */}

            {/* the comment and rating section */}
            <div className='about-rating-section'>
                <h2>Rate Your Experience</h2>
                <div className="about-rating-form">

                    {/* everything below is the star rating system */}
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
                    {/* everything below is the star rating system*/}

                    {/* everything below is the comment box */}
                    <textarea
                        className="comment-box"
                        placeholder={isAuthenticated ? "Leave your comment here..." : "Please login to leave a comment"}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                        disabled={!isAuthenticated}
                    />
                    {/* everything below is the comment box */}
                    <button 
                        type="button" 
                        className="submit-btn" 
                        disabled={loading}
                        onClick={handleSubmit}
                    >
                        {loading ? 'Submitting...' : (isAuthenticated ? 'Submit' : 'Login to Comment')}
                    </button>
                </div>
                {submitted && (
                    <div className="thank-you">
                        <p>Thank you for your feedback!</p>
                    </div>
                )}
            </div>
            {/* the comment and rating section */}

            {/* old comments section*/}
            <div className="comments-section">
                <h3>Recent Comments</h3>
                <div className="comments-grid">
                    {exampleComments.map((c, idx) => (
                        <div className="comment-box-example" key={idx}>
                            <div className="comment-user">{c.name}</div>
                            <div className="comment-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < c.rating ? 'star filled' : 'star'}>&#9733;</span>
                                ))}
                            </div>
                            <div className="comment-text">{c.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/* old comments section*/}


        </div>

    );
};

export default About;