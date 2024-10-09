// src/components/Home.js
import React from 'react';

const Home = () => {
  const handleLogout = () => {
    localStorage.clear();
    // Logout logic
    // window.open('http://localhost:5000/auth/google', '_self');
  }
  return (
    <div>
      <h1>Welcome Home!</h1>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Home;
