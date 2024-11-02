import React, { useEffect, useState } from 'react';
import { geminiApi, rapidApi } from '../API/APIRoutes';
import axios from 'axios'
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const ToursDetails = ({ name, image, uniqueID }) => {
    const [description, setDescription] = useState("");
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        const fetchDescription = async () => {
            try {
                const apiUrl = `${geminiApi}=${import.meta.env.VITE_API_KEY}`
                const response = await axios.post(apiUrl, {
                    "contents": [{
                        "parts": [{
                            "text": `Provide tourism information about ${name} in about 150 words only`
                        }]
                    }]
                });
                if (response.data.candidates) {
                    setDescription(response.data.candidates[0].content.parts[0].text);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchDescription()
    }, [])
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const today = new Date();

                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                const formattedToday = `${year}-${month}-${day}`;

                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);

                const tomorrowYear = tomorrow.getFullYear();
                const tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
                const tomorrowDay = String(tomorrow.getDate()).padStart(2, '0');
                const formattedTomorrow = `${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}`;

                const apiUrl = `${rapidApi}locationId=${uniqueID}&checkinDate=${formattedToday}&checkoutDate=${formattedTomorrow}&units=metric&temperature=c&currencyCode=INR`;
                const response = await axios.get(apiUrl, {
                    headers: {
                        'x-rapidapi-host': import.meta.env.VITE_RAPID_API_HOST,
                        'x-rapidapi-key': import.meta.env.VITE_X_RAPID_API_KEY
                    }
                });
                setHotels(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchHotels();
    }, [])
    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <img
                    src={image}
                    alt={name}
                    className="w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>
                    <p className="text-gray-600 text-xl font-semibold">{description}</p>
                    <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, index) => (
                            <AiFillStar key={index} className="text-yellow-400 text-3xl" />
                        ))}
                    </div>
                </div>
            </div>


            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotels.slice(0, 15).map((hotel, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start"
                    >
                        <div className="flex items-center mb-4">
                            <img
                                src={hotel.photoUrls}
                                alt={`${hotel.name} image`}
                                className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                            <h3 className="text-2xl font-semibold text-gray-800">{hotel.name}</h3>
                        </div>
                        <div className='flex justify-between gap-32 items-center'>
                            <div>
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <AiFillStar key={index} className="text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-lg text-black font-bold mt-2">
                                    ₹ {hotel.priceBreakdown.grossPrice.value.toFixed(2)} / night
                                </p>
                            </div>
                            <div>
                                <Link to={`/payment/${hotel.priceBreakdown.grossPrice.value.toFixed(0)}`}><button className='px-4 py-4 bg-yellow-400 rounded-md text-xl font-semibold'>Book Now</button></Link>
                            </div>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    );
};

export default ToursDetails;
