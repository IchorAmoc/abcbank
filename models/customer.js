const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = new mongoose.Schema({

    personal_number: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    accounts: [{
        account_number: {
            type: Number,
            required: true
        },
        account_name: {
            type: String,
            required: true
        }
    }],
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    dob: {
        type: Date
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

customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);