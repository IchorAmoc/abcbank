const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({

    personal_number: {
        type: Number,
        required: true
    },
    account_number: {
        type: Number
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', customerSchema);