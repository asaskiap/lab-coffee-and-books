const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['bookshop', 'coffee_shop']
    },
    location: {
        coordinates: [{
            type: Number,
            min: -180,
            max: 180
        }],
        type: {
            type: String,
            default: 'Point',
            required: true
        }
    }
}, {
    timestamps: {
        createdAt: 'creationDate',
        updatedAt: 'updateDate'
    }
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;