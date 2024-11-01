/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '/assets/hero.jpg'
import axios from 'axios'
import { getCitiesEndpoint } from '../API/APIRoutes';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineSupportAgent } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { MdOutlineTravelExplore } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GrUserExpert } from "react-icons/gr";
import { MdFreeCancellation } from "react-icons/md";
import { Link } from 'react-router-dom';

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
                                        <Link to={`/city/${city.name}`}><button className='px-4 py-4 bg-yellow-400 rounded-md text-xl font-semibold'>See Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <h1 className='text-yellow-400 text-7xl font-bold text-center my-4'>Why Choose TravelSphere</h1>
            <div className="py-12">
                <div className="container mx-auto text-center px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3"><MdOutlineSupportAgent /> 24/7 Support</h3>
                            <p className="text-gray-600 mt-2">We’re here to help you at every step of your journey.</p>
                        </div>


                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3"><MdOutlinePriceCheck /> Best Price Guarantee</h3>
                            <p className="text-gray-600 mt-2">Get the best deals and prices for your travel needs.</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3"><MdOutlineTravelExplore /> Tailored Itineraries</h3>
                            <p className="text-gray-600 mt-2">Customize your travel experience to suit your preferences.</p>
                        </div>


                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3"><RiSecurePaymentFill /> Secure Payments</h3>
                            <p className="text-gray-600 mt-2">Your transactions are safe with our encrypted payment options.</p>
                        </div>


                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3">< GrUserExpert /> Expert Guides</h3>
                            <p className="text-gray-600 mt-2">Travel with knowledgeable guides who enhance your experience.</p>
                        </div>


                        <div className="flex flex-col items-center">
                            <h3 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3"><MdFreeCancellation /> Flexible Cancellation</h3>
                            <p className="text-gray-600 mt-2">Plans change; we offer flexible cancellation policies for peace of mind.</p>
                        </div>
                    </div>
                </div>
                <h1 className='text-yellow-400 text-7xl font-bold text-center my-4'>What Our Travelers Say</h1>
                <div className="py-12">
                    <div className="container mx-auto text-center px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"This was the trip of a lifetime! The services were exceptional!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- John Doe</h3>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"I can't recommend TravelSphere enough! Everything was perfect!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- Sarah Smith</h3>
                            </div>


                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"An unforgettable experience with top-notch guides and support!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- Michael Johnson</h3>
                            </div>


                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"TravelSphere made our honeymoon special. We loved every moment!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- Emily Davis</h3>
                            </div>


                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"Excellent service from start to finish! We’ll be back for sure!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- Daniel Lee</h3>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <p className="text-gray-600 text-2xl">"Amazing tours and experiences! We explored so much in just one week!"</p>
                                <h3 className="text-gray-800 mt-4 text-3xl font-semibold">- Jessica Taylor</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-12 bg-yellow-400 text-white text-center">
                    <h2 className="text-5xl font-semibold mb-4">Ready for Your Next Adventure?</h2>
                    <p className="mb-6 text-3xl">Book your dream trip today and explore the world like never before.</p>
                    <button className="bg-gray-800 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-700">
                        Book Now
                    </button>
                </div>
            </div>

        </>
    );
};

export default Home;