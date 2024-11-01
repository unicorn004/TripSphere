import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { getFlightsEndpoint } from '../API/APIRoutes';
import { AiFillStar } from 'react-icons/ai';

const Flight = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(getFlightsEndpoint, { withCredentials: true });
                if (response.data.success) {
                    setFlights(response.data.flights); 
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchFlights();
    }, []);

    return (
        <>
            <Header />
            <div>
                <h1 className='text-yellow-400 text-7xl font-bold text-center my-4'>Available Flights</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-10 mx-8">
                {
                    flights.length > 0 && flights.map((flight, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={flight.airlineImageUrl} alt={flight.airlineName} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col">
                                <h3 className="text-3xl font-bold text-gray-800">{flight.fromCity} to {flight.toCity}</h3>
                                <h4 className="text-xl font-semibold text-gray-700">{flight.airlineName}</h4>
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <AiFillStar key={index} className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className='text-black mt-2 font-bold text-xl'>Round Trip Price: ₹{flight.roundTripPrice}</p>
                                <p className='text-black mt-2 font-bold text-xl'>One Way Price: ₹{flight.oneWayPrice}</p>
                                <div className="mt-4">
                                    <button className='px-4 py-2 bg-yellow-400 rounded-md text-xl font-semibold'>See Details</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
};

export default Flight;
