const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        uniqueID: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        airportCode: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = { Destination };