import React, { useState } from 'react';

const Flight = () => {
  const [from, setFrom] = useState('India (IN)');
  const [to, setTo] = useState('Indira Gandhi International Airport');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    // PI to fetch flights (replace with a real API)
    const response = await fetch(
      ``
    );
    const data = await response.json();
    setFlights(data);
  };

  return (
    <div className="flex flex-col items-center h-screen bg-blue-900">
      {/* Main card */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Flight Tickets to Indira Gandhi International Airport</h2>

        {/* Flight search form */}
        <div className="flex justify-around mb-4">
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-700 font-medium mb-1">From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-700 font-medium mb-1">To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-700 font-medium mb-1">Depart</label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-700 font-medium mb-1">Return</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Travellers and class selection */}
        <div className="flex justify-around mb-6">
          <div className="flex flex-col w-1/4">
            <label className="text-sm text-gray-700 font-medium mb-1">Travellers and cabin class</label>
            <select className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>1 adult, Economy</option>
              <option>2 adult, Economy</option>
              <option>3 adult, Economy</option>
              <option>1 adult, Buisness</option>
              <option>2 adult, Buisness</option>
              <option>3 adult, Buisness</option>
              {/* Add more options if needed */}
            </select>
          </div>

          <div className="flex items-end w-1/4">
            <button
              onClick={searchFlights}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Display flight cards if flights are available */}
      <div className="mt-8 w-full max-w-3xl">
        {flights.length > 0 && flights.map((flight, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{flight.airline}</h3>
            <p>From: {flight.from}</p>
            <p>To: {flight.to}</p>
            <p>Depart: {flight.departTime}</p>
            <p>Return: {flight.returnTime}</p>
            <p>Price: {flight.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flight;
