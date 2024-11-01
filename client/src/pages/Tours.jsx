import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'
import { getCitiesEndpoint } from '../API/APIRoutes';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Tours = () => {
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
            <div>
                <h1 className='text-yellow-400 text-7xl font-bold text-center my-4'>Destinations we provide</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 mx-8">
                {
                    cities.length > 0 && cities.map((city) => {
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
                                        <Link to={`/city/${city.name}`}><button className='px-4 py-4 bg-yellow-400 rounded-md text-xl font-semibold'>See Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Tours
