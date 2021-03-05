const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    owner_personal_number: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    account_number: {
        type: String,
        required: true
    },
    account_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Account', accountSchema);