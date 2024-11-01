const express = require('express');
const router = express.Router();
const Flight = require('../models/flight');

router.post('/', async (req, res) => {
    const { fromCity, toCity, airlineName, airlineImageUrl, roundTripPrice, oneWayPrice } = req.body;

    try {
        const newFlight = new Flight({
            fromCity,
            toCity,
            airlineName,
            airlineImageUrl,
            roundTripPrice,
            oneWayPrice,
        });

        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json({ success: true, flights });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
module.exports = router;
