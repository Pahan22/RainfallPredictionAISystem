// src/page/LogoutPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear user session or token
        localStorage.removeItem('user'); // Example, adjust as needed

        // Redirect to login page
        navigate('/login');
    }, [navigate]);

    return (
        <div className="container mt-4">
            <h2>Logging out...</h2>
            <p>You are being logged out. If you are not redirected automatically, <a href="/login">click here</a>.</p>
        </div>
    );
};

export default LogoutPage;
