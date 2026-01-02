import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/orderTracking.css';

const OrderTracking = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, items, total } = location.state || {};
    
    const [currentStep, setCurrentStep] = useState(0);
    const [orderComplete, setOrderComplete] = useState(false);

    const steps = [
        { id: 1, title: 'Order Placed', icon: '✓', time: 2000 },
        { id: 2, title: 'Preparing Food', icon: '👨‍🍳', time: 4000 },
        { id: 3, title: 'Quality Check', icon: '🔍', time: 3000 },
        { id: 4, title: 'Ready for Pickup/Delivery', icon: '🎉', time: 2000 }
    ];

    useEffect(() => {
        // If no order data, redirect back to cart
        if (!orderId) {
            navigate('/cart');
            return;
        }

        // Simulate order progress
        let stepIndex = 0;
        const progressOrder = () => {
            if (stepIndex < steps.length) {
                setTimeout(() => {
                    setCurrentStep(stepIndex + 1);
                    stepIndex++;
                    if (stepIndex < steps.length) {
                        progressOrder();
                    } else {
                        // Order complete
                        setTimeout(() => {
                            setOrderComplete(true);
                        }, 1000);
                    }
                }, steps[stepIndex].time);
            }
        };

        progressOrder();
    }, [orderId, navigate, steps]);

    const handleGoHome = () => {
        toast.success('🎉 Thank you for your order!');
        navigate('/');
    };

    const handleOrderAgain = () => {
        navigate('/menu');
    };

    if (orderComplete) {
        return (
            <div className="order-tracking-page">
                <div className="order-complete-container">
                    <div className="success-animation">
                        <div className="success-circle">
                            <div className="success-checkmark">✓</div>
                        </div>
                    </div>
                    <h1>🎉 Order Complete!</h1>
                    <p className="success-message">
                        Your order is ready! Thank you for choosing Chez Roy.
                    </p>
                    <div className="order-summary">
                        <h3>Order #{orderId}</h3>
                        <p className="order-items">
                            {items?.length || 0} items - Total: ${total?.toFixed(2) || '0.00'}
                        </p>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleOrderAgain} className="order-again-btn">
                            🍽️ Order Again
                        </button>
                        <button onClick={handleGoHome} className="go-home-btn">
                            🏠 Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="order-tracking-page">
            <div className="order-tracking-container">
                <h1>📦 Tracking Your Order</h1>
                <p className="order-id">Order #{orderId}</p>
                
                <div className="order-items-summary">
                    <h3>Your Items:</h3>
                    <div className="items-list">
                        {items?.map((item, index) => (
                            <div key={index} className="item-summary">
                                <span>{item.food_name}</span>
                                <span>x{item.quantity}</span>
                                <span>${(item.food_price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="total-summary">
                        <strong>Total:</strong>
                        <strong>${total?.toFixed(2) || '0.00'}</strong>
                    </div>
                </div>

                <div className="progress-tracker">
                    {steps.map((step, index) => (
                        <div 
                            key={step.id} 
                            className={`progress-step ${currentStep > index ? 'completed' : ''} ${currentStep === index + 1 ? 'active' : ''}`}
                        >
                            <div className="step-icon">
                                {currentStep > index ? '✓' : step.icon}
                            </div>
                            <div className="step-title">{step.title}</div>
                            {index < steps.length - 1 && (
                                <div className={`step-line ${currentStep > index + 1 ? 'completed' : ''}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="estimated-time">
                    <p>⏱️ Estimated completion: {Math.max(0, (steps.length - currentStep) * 2)} minutes</p>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
