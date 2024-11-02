import React, { useState } from 'react';
import axios from 'axios';
import { loginUserEndpoint } from '../API/APIRoutes.js';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/assets/logo.png';

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const Login = () => {
    const handleLogin = () => {
        window.open('http://localhost:5000/auth/google', '_self');
        const userCookie = getCookie('user');
        if (userCookie) {
            localStorage.setItem('user', userCookie);
        }
    };

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(loginUserEndpoint, userData, { withCredentials: true });
            if (response.data.success) {
                alert(response.data.message);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('auth-token', JSON.stringify(response.data.token));
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <div className="flex items-center mb-6">
                    <img src={logo} alt="TripSphere Logo" className="h-12 mr-3" />
                    <h1 className="text-2xl font-bold text-gray-700">Welcome to TravelSphere!</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder='Enter your email'
                        value={userData.email}
                        onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="password"
                        placeholder='Enter your Password'
                        value={userData.password}
                        onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type='submit'
                        className="w-full p-3 bg-indigo-600 text-white rounded-lg transition duration-300 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                    <p className='text-lg font-semibold text-center'>Don't have an account ? <Link to={'/'} className='text-blue-600'>Sign up</Link></p>
                </form>
                <button
                    onClick={handleLogin}
                    className="w-full mt-4 p-3 bg-red-600 text-white rounded-lg transition duration-300 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Login with Google
                </button>
            </div>
        </div>
    )
}

export default Login
