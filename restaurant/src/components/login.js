import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import restaurantImage from '../images/chez-roy-restaurant.png';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    
    const { login, signup } = useContext(UserContext);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin) {
            if (!formData.name) {
                newErrors.name = 'Name is required';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            setLoading(true);
            
            try {
                let result;
                if (isLogin) {
                    // Login
                    result = await login(formData.email, formData.password);
                } else {
                    // Sign up
                    result = await signup(formData.name, formData.email, formData.password);
                }

                if (result.success) {
                    // Success! Redirect to home page
                    navigate('/');
                } else {
                    // Show error message
                    setErrors({ general: result.error });
                }
            } catch (error) {
                setErrors({ general: 'Something went wrong. Please try again.' });
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    // Toggle between login and signup
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });
        setErrors({});
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="row login-wrapper shadow-lg">
                    {/* Left side - Image */}
                    <div className="col-lg-6 p-0 login-image-section">
                        <img src={restaurantImage} alt="Chez Roy Restaurant" className="img-fluid" />
                        <div className="login-image-overlay">
                            <h2>Welcome to Chez Roy</h2>
                            <p>Experience authentic Lebanese cuisine</p>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className="col-lg-6 login-form-section">
                        <div className="login-form-container">
                            <h1 className="mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                            <p className="login-subtitle mb-4">
                                {isLogin 
                                    ? 'Sign in to access your account' 
                                    : 'Join us for an amazing dining experience'}
                            </p>

                            {/* General error message */}
                            {errors.general && (
                                <div className="alert alert-danger" role="alert">
                                    {errors.general}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                {/* Name field - only for signup */}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>
                                )}

                                {/* Email field */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Password field */}
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                {/* Confirm Password - only for signup */}
                                {!isLogin && (
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm your password"
                                        />
                                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                                    </div>
                                )}

                                {/* Forgot password - only for login */}
                                {isLogin && (
                                    <div className="text-end mb-3">
                                        <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
                                    </div>
                                )}

                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary w-100 login-submit-btn" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            {isLogin ? 'Signing In...' : 'Creating Account...'}
                                        </>
                                    ) : (
                                        isLogin ? 'Sign In' : 'Create Account'
                                    )}
                                </button>
                            </form>

                            {/* Toggle between login and signup */}
                            <div className="login-toggle text-center mt-4 pt-4">
                                <p className="mb-0">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button onClick={toggleForm} className="btn btn-link toggle-btn p-0">
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;