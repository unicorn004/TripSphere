// src/components/Home.js
import React from 'react';

const Home = () => {
    const handleLogout = async () => {
        // Call the logout endpoint on your server
        await fetch('http://localhost:5000/logout', {
            method: 'GET',
            credentials: 'include', // Include cookies for session management
        });
        
        localStorage.clear();
        // Redirect to the login page
        window.open('http://localhost:5173/', '_self');
    }
    
    return (
        <div>
            <h1>Welcome Home!</h1>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    );
};

export default Home;