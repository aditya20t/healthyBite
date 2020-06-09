const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                quantity: {
                    type: Number,
                    default: 0,
                    required: true
                },
                ref: 'product'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = Order = mongoose.model('order', OrderSchema);