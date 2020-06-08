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
                ref: 'item'
            },
            quantity: {
                type: Number,
                default: 0
            }
        }
    ]
});

module.exports = Order = mongoose.model('order', OrderSchema);