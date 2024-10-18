import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { setCityEndpoint } from '../API/APIRoutes.js';
import { useNavigate } from 'react-router-dom';

const City = () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    useEffect(() => {
        const userToken = getCookie('user');

        if (userToken) {
            const decodedUserToken = decodeURIComponent(userToken);
            const userObject = JSON.parse(decodedUserToken)
            localStorage.setItem('user', JSON.stringify(userObject));
        }
    }, []);
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.post(setCityEndpoint, {
                "city": city,
                "email": user.email
            });
            if (response.data.success) {
                alert(response.data.message);
                setCity("");
                navigate('/home');
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-sans">
            <h2 className="text-2xl mb-4">Enter Your City</h2>
            <form className="bg-white bg-opacity-20 rounded-lg p-6 shadow-lg text-center" onSubmit={submitHandler}>
                <input
                    type="text"
                    placeholder='Please enter your city'
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                    required
                    className="p-2 mb-4 border-none rounded-lg w-64 bg-white text-black text-lg"
                />
                <button
                    type='submit'
                    className="px-4 py-2 rounded-lg bg-red-400 text-white transition duration-300 hover:bg-red-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default City;
