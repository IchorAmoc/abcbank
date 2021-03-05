const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// All custommers route
router.get('/', async (req, res) => {
    let searchFor = {};
    if(req.query.last_name !== null && req.query.last_name !== '') {
        searchFor.last_name = new RegExp(req.query.last_name, 'i');
    }
    try {

        const customers = await Customer.find(searchFor);
        res.render('customers/index', { 
            customers: customers,
            searchFor: req.query
        });
} catch {
    res.redirect('/');
    }
})

// New customer route (Display form)
router.get('/new', (req, res) => {
    res.render('customers/new', { customer: new Customer() });
})

// Create custommer route (Create, does not render anything)
router.post('/', async (req, res) => {
    const customer = new Customer({
        personal_number: req.body.personal_number,
        account_number: Math.floor(10000000000 + Math.random() * 90000000000),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.personal_number.substring(0, 6).trim(),
        city: req.body.city,
        created_date: new Date(Date.now)[0]
    })
    try {
        const newCustomer = await customer.save();
        //res.redirect(`customer/${newCustomer.personal_number}`)
        res.redirect('/customers');
    } catch {
        res.render('customers/new', {
            customer: customer,
            errorMessage: 'Error creating customer'
        });
    }
})

//

module.exports = router;