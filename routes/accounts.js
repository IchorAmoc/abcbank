const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Account = require('../models/account');

// New account route (Display)
router.get('/new', async (req, res) => {
    res.render('customers/new-account', { account: new Account() });
})

// Add account to customer
router.post('/', async (req, res) => {
    // let persNr = req.body.personal_number;
    let account = {};
        account = new Account({
            account_number: Math.floor(10000000000 + Math.random() * 90000000000),
            account_name: req.body.account_name
        })

    try {
        await account.save();
        new Customer({
            personal_number: req.body.personal_number,
            accounts: [...account]
        })
        

    } catch {
        res.render('customers/new', {
            customer: customer,
            errorMessage: 'Error creating customer'
        });

    }
})

module.exports = router;
