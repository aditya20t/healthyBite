const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema ({
    data: {
        type:JSON,
        required: true
    },
    o_id: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    amount: {
        type: Number
    }
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);