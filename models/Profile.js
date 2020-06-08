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
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);