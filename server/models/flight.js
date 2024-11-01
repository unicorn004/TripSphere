const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    fromCity: {
        type: String,
        required: true,
    },
    toCity: {
        type: String,
        required: true,
    },
    airlineName: {
        type: String,
        required: true,
    },
    airlineImageUrl: {
        type: String,
        required: true,
    },
    roundTripPrice: {
        type: Number,
        required: true,
    },
    oneWayPrice: {
        type: Number,
        required: true,
    },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;