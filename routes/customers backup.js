const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// All custommers route
router.get('/', async (req, res) => {
    let searchFor = {};
    if (req.query.personal_number != null && req.query.personal_number != '') {
        searchFor = {personal_number: req.query.personal_number}
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
router.get('/new', async (req, res) => {
    res.render('customers/new', { customer: new Customer() });
})

// Create custommer route (Create, does not render anything)
router.post('/', async (req, res) => {
       const customer = new Customer({
            personal_number: req.body.personal_number,
            account_number: Math.floor(10000000000 + Math.random() * 90000000000),
            account_name: req.body.account_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: req.body.personal_number.substring(0, 6).trim(),
            city: req.body.city,
            created_date: new Date(Date.now)[0]
        })

    try {
        const newCustomer = await customer.save();
        res.redirect(`customer/${newCustomer.id}`)
        //res.redirect('/customers');

    } catch {
        res.render('customers/new', {
            customer: customer,
            errorMessage: 'Error creating customer'
        });

    }
})

// Show user
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    try{
        res.render('customers/show', { customer: customer })
    } catch {
        res.redirect('/');
    }

});

// Edit customer (Form display)
router.get('/:id/edit', async (req, res) => {

    //console.log(req.params.id + " - " + await Customer.findById(req.params.id))

    try {
        const customer = await Customer.findById(req.params.id);
        res.render('customers/edit', { customer: customer });
    } catch {
        res.redirect('/customers')
    }
})

// Edit customer (update to db)
router.put('/:id', async (req, res) => {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.city = req.body.city;
        await customer.save();
        res.redirect(`/customers/${customer.id}`);
    } catch {
        if (customer == null) {
            res.redirect('/');
        } else {
            res.render('customers/edit', {
                customer: customer,
                errorMessage: 'Error updating customer'
            })
        }
    }
})

// Delete customer
router.delete('/:id', async (req, res) => {
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        await customer.remove();
        res.redirect('/customers');
    } catch {
        if(customer == null) {
            res.redirect('/');
        } else {
        res.redirect(`/customers/${customer.id}`);
        }
    }
})

module.exports = router;