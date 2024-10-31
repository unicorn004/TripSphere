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
    <div className="flex flex-col items-center h-screen bg-yellow-300">
  {/* Main card */}
  <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-3xl">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
      Flight Tickets to Indira Gandhi International Airport
    </h2>

    {/* Flight search form */}
    <div className="grid grid-cols-2 gap-6 mb-8">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">From</label>
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">To</label>
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">Depart</label>
        <input
          type="date"
          value={departDate}
          onChange={(e) => setDepartDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">Return</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    {/* Travellers and cabin class selection */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">Number of People</label>
        <input
          type="number"
          min="1"
          placeholder="e.g., 2"
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium mb-2">Cabin Class</label>
        <select
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Economy</option>
          <option>Business</option>
          <option>First Class</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={searchFlights}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
