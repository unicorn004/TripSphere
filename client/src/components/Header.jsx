import React from 'react';
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
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
        <nav className="bg-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                <div className="text-2xl font-bold text-gray-800 flex flex-row gap-3 justify-center items-center">
                    <img src={Logo} alt="" className='h-[50px] w-[70px]' />
                    <Link to="/" className="text-yellow-500">TravelSphere</Link>
                </div>
                <div className="flex space-x-6">
                    <Link to="/home" className="text-yellow-500 text-xl font-bold">
                        Home
                    </Link>
                    <Link to="/tours" className="text-yellow-500 text-xl font-bold">
                        Tours
                    </Link>
                    <Link to="/flight" className="text-yellow-500 text-xl font-bold">
                        Flights
                    </Link>
                    <Link to="/chat" className="text-yellow-500 text-xl font-bold">
                        Elisa
                    </Link>
                    <Link to="/about" className="text-yellow-500 text-xl font-bold">
                        About
                    </Link>
                    <Link to="/contact" className="text-yellow-500 text-xl font-bold">
                        Contact
                    </Link>
                </div>
                <div>
                    <Link to="/logout" className="text-black text-xl font-semibold">
                        <button onClick={handleLogout} className='px-4 py-4 bg-yellow-400 rounded-md'>Logout</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;
