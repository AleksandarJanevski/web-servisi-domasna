const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    fuel_type: {
        type: String,
        required: true
    },
    range_km: {
        type: Number,
        required: true
    },
    picture_url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    kilowatts: {
        type: Number,
        required: true
    },
    gear_shift: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    zero_to_hundred_time: {
        type: Number,
        required: true
    }
});

const carModel = mongoose.model('avtomobili', carSchema);

module.exports = carModel
