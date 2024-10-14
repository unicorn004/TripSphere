import React, { useState } from 'react';
import axios from 'axios'
import { loginUserEndpoint } from '../API/APIRoutes.js';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const handleLogin = () => {
        window.open('http://localhost:5000/auth/google', '_self');
    };
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        password: '',
        city: ''
    });
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(loginUserEndpoint, userData, { withCredentials: true });
            if (response.data.success) {
                alert(response.data.message);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your name' value={userData.name} onChange={(event) => setUserData({ ...userData, name: event.target.value })} />
                <input type="email" placeholder='Enter your email' value={userData.email} onChange={(event) => setUserData({ ...userData, email: event.target.value })} />
                <input type="password" placeholder='Enter your Password' value={userData.password} onChange={(event) => setUserData({ ...userData, password: event.target.value })} />
                <input type="text" placeholder='Enter city' value={userData.city} onChange={(event) => setUserData({ ...userData, city: event.target.value })} />
                <button type='submit'>Login</button>
            </form>
            <button onClick={handleLogin}>Login with Google</button>
        </div>
    );
};

export default Login;
