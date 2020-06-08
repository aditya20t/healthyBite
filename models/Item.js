const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    marketPrice: {
        type: Number,
        default: 0,
        required: true
    },
    hbPrice: {
        type: Number,
        default: 0,
        required: true
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = Item = mongoose.model('item', ItemSchema);