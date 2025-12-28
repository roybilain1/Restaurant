import React, { useState, useEffect } from 'react';
import '../styles/about.css';
import aboutImage from '../images/chez-roy-restaurant.png';

const About = () => {
    // the rating/comment section 
    const [name, setName] = useState('You');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [userComments, setUserComments] = useState([]);
    const [exampleComments, setExampleComments] = useState([]);

    // Fetch comments from API
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/comments');
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

        fetchComments();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating > 0 && comment.trim() !== '') {
            setUserComments([
                ...userComments,
                { name: 'You', rating, comment }
            ]);
            setSubmitted(true);
            setComment('');
            setRating(0);
        }
    };
    
    // add a new comment to the data base table
    const addCommentToDatabase = async (name, rating, comment) => {
        try {
            const response = await fetch('http://localhost:3001/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, rating, comment }),
            });
            const data = await response.json();
            if (data.success) {
                console.log('Comment added successfully:', data);
            } else {
                console.error('Failed to add comment:', data.error);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
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
                <form onSubmit={handleSubmit} className="about-rating-form">

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
                        placeholder="Leave your comment here..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows={4}
                    />
                    {/* everything below is the comment box */}
                    <button type="submit" className="submit-btn" onClick={() => addCommentToDatabase(name, rating, comment)}>Submit</button>
                </form>
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
                    {userComments.map((c, idx) => (
                        <div className="comment-box-example" key={`user-${idx}`}>
                            <div className="comment-user">{c.name}</div>
                            <div className="comment-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < c.rating ? 'star filled' : 'star'}>&#9733;</span>
                                ))}
                            </div>
                            <div className="comment-text">{c.comment}</div>
                        </div>
                    ))}
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