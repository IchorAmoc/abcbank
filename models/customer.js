const mongoose = require('mongoose');
const Account = require('./account');

const customerSchema = new mongoose.Schema({

    personal_number: {
        type: Number,
        required: true
    },
    accounts: [],
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

customerSchema.pre('remove', function(next) {
    Account.find({ owner_personal_number: this.personal_number}, (err, accounts) => {
        if(err) {
            next(err);
        } else if(accounts.length > 0) {
            next(new Error('This customer still has active accounts. Please remove accounts before customer.'))
        } else {
            next();
        }
    })
})

module.exports = mongoose.model('Customer', customerSchema);