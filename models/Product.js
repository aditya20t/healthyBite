const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0,
        required: true
    }
});

module.exports = Item = mongoose.model('product', ProductSchema);