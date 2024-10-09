const { request } = require('express');
const { Destination } = require('../models/destination');

const addDestination = async (request, response) => {
    try {
        const { name, uniqueID, image } = request.body;
        const destination = await Destination.create({
            name, uniqueID, image
        });
        return response.status(201).json({
            success: true,
            message: "Destination added successfully",
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

const getAllDestinations = async (request, response) => {
    try {
        const destinations = await Destination.find();
        return response.status(201).json({
            success: true,
            message: "Destinations retrieved successfully",
            destinations
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error updating user city',
        });
    }
}

module.exports = { addDestination, getAllDestinations };