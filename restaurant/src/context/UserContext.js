import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is logged in on app load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            verifyToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    // Verify token with backend
    const verifyToken = async (token) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/verify', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // Token is invalid, remove it
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and user info
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true, message: data.message };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    // Signup function
    const signup = async (name, email, password) => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token and user info
                localStorage.setItem('token', data.token);
                setUser(data.user);
                return { success: true, message: data.message };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Network error. Please try again.' };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // Get token for API requests
    const getToken = () => {
        return localStorage.getItem('token');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        getToken,
        isAuthenticated: !!user
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};
