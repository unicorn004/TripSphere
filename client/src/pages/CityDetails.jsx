import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ToursDetails from '../components/ToursDetails';
import { getCitiesEndpoint } from '../API/APIRoutes';

const CityDetails = () => {
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get(getCitiesEndpoint, { withCredentials: true });
                if (response.data.success) {
                    setCities(response.data.destinations);
                    const matchedCity = response.data.destinations.find(
                        city => city.name.toLowerCase() === name.toLowerCase()
                    );
                    setCity(matchedCity);
                }
            } catch (error) {
                console.log("Error fetching cities:", error);
            }
        };
        fetchCities();
    }, [name]);

    if (!city) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <ToursDetails name={city.name} image={city.image} uniqueID={city.uniqueID} />
        </div>
    );
};

export default CityDetails;
