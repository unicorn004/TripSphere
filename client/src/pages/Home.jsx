import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../assets/hero.jpg'
import axios from 'axios'
import { getCitiesEndpoint } from '../API/APIRoutes';
import { AiFillStar } from 'react-icons/ai';

const Home = () => {
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(getCitiesEndpoint, { withCredentials: true });
                if (response.data.success) {
                    setCities(response.data.destinations);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCities();
    }, [])
    return (
        <>
            <Header />
            <div className={`relative bg-cover bg-center py-20 h-[600px]`} style={{ backgroundImage: `url(${Hero})` }}>
                <div className="container mx-auto text-center px-6">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className='container mx-auto text-center px-6 relative z-10'>
                        <h1 className="text-6xl font-bold text-white mb-4">Explore the World with <span className='text-yellow-400 font-bold text-7xl'>TravelSphere</span></h1>
                        <p className="text-3xl text-white max-w-2xl mx-auto">
                            Discover unforgettable adventures and unique experiences in cities around the globe. Let us help you find the perfect tour to make your travel dreams come true!
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h1 className='text-yellow-400 text-7xl font-bold text-center my-4'>Most popular destinations among visitors</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 mx-8">
                {
                    cities.length > 0 && cities.slice(0, 8).map((city) => {
                        return (
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <img src={city.image} alt="Paris" className="w-full h-48 object-cover" />
                                <div className="p-6 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-3xl font-bold text-gray-800">{city.name}</h3>
                                        <div className="flex items-center mt-2">
                                            {[...Array(5)].map((_, index) => (
                                                <AiFillStar key={index} className="text-yellow-400" />
                                            ))}
                                        </div>
                                        <p className='text-black mt-2 font-bold text-xl'>Rating: 4.5/5.0</p>
                                    </div>
                                    <div>
                                        <button className='px-4 py-4 bg-yellow-400 rounded-md text-xl font-semibold'>See Details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
};

export default Home;