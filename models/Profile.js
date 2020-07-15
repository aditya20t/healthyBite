const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    email: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    pincode: {
        type: Number,
        required: true
    },
    orders: [
        {
            items: [
                {
                    productid: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'product'
                    },
                    name: {
                        type: String,
                        required: true
                    },
                    quantity: {
                        type: Number,
                        default: 0,
                        required: true
                    }
                }
            ],
            date: {
                type: Date,
                default: Date.now,
                required: true
            },
            order_id: {
                type: String,
                required: true
            },
            status: {
                type: Boolean,
                default: false,
                required: true
            },
            mode: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);