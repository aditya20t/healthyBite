const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema ({
    data: {
        type:JSON,
        required: true
    }
});

module.exports = Payment = mongoose.model('payment', PaymentSchema);