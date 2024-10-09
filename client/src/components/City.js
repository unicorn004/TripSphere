import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { setCityEndpoint } from '../API/APIRoutes.js';
import { useNavigate } from 'react-router-dom';

// Function to get the value of a specific cookie by name



const City = () => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    useEffect(() => {
        const userToken = getCookie('user');

        // Store it in localStorage
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
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Please enter your city' onChange={(event) => setCity(event.target.value)} value={city} required />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default City
