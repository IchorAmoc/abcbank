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

        // CREATE // POST //
// New customer route (Display form)
router.get('/new', async (req, res) => {
    res.render('customers/new', { customer: new Customer() });
})
// Create custommer route (Add to db)
router.post('/', async (req, res) => {
    const startDate = Date.now();
    let dob = req.body.personal_number.substring(0,6).trim();
    let dd = dob.substring(0,2);
    let mm = dob.substring(2,4);
    let yy = dob.substring(4,6);
    let newdob = new Date(yy, mm, dd);

       const customer = new Customer({
            personal_number: req.body.personal_number,
            accounts: [
                {
                account_number: Math.floor(10000000000 + Math.random() * 90000000000),
                account_name: req.body.account_name
                }
            ],
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            dob: newdob,
            city: req.body.city,
            created_date: new Date(Date.now)[0]
        })

    try {
        const newCustomer = await customer.save();
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
        res.redirect(`customers/${newCustomer.id}`)

    } catch {
        // If customer personal number already exists, send error
        res.render('customers/new', {
            customer: customer,
            errorMessage: 'Error creating customer'
        });

    }
})

    // Show user //
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    const accounts = await customer.accounts;
    try{
        res.render('customers/show', { customer: customer, accounts: accounts })
    } catch {
        res.redirect('/');
    }

});

        // EDIT // PUT //
// Edit customer (Form display)
router.get('/:id/edit', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.render('customers/edit', { customer: customer });
    } catch {
        res.redirect('/customers/:id')
    }
})
// Edit customer (update to db)
router.put('/:id', async (req, res) => {
    const startDate = Date.now();
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        customer.first_name = req.body.first_name;
        customer.last_name = req.body.last_name;
        customer.city = req.body.city;
        await customer.save();
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
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

        // ADD TO EXISTING // POST or PUT ? //
// Add account to customer (Form display)
router.get('/:id/addAcc', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.render('customers/addAcc', { customer: customer });
    } catch {
        res.redirect('/customers')
    }
})
// Add account to customer (update to db)
router.post('/:id', async (req, res) => {
    const startDate = Date.now();
    console.log('Add account...')
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        customer.accounts.push({
                account_number: Math.floor(10000000000 + Math.random() * 90000000000),
                account_name: req.body.account_name
            });
        await customer.save();
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
        res.redirect(`/customers/${customer.id}`);
    } catch {
        if (customer == null) {
            res.redirect('/');
        } else {
            console.log('failed')
            res.render('customers/addAcc', {
                customer: customer,
                errorMessage: 'Error adding account to customer'
            })
        }
    }
})

// Edit account (Form display)
router.get('/:id/editAcc/:accid', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        let account;
        customer.accounts.forEach( acc => {
            if(acc.id === req.params.accid){
                account = acc;
            }
        })
        res.render('customers/editAcc', { customer: customer, account: account });
    } catch {
        res.redirect('/customers/:id')
    }
})
// Edit account -> Update to db
router.put('/:id/:accid', async (req, res) => {
    const startDate = Date.now();
    const customer = await Customer.findById(req.params.id);
    try {
        customer.accounts.forEach( acc => {
            if(acc.id === req.params.accid){
                console.log(acc.account_name);
                console.log(req.body.account_name);
                
                acc.account_name = req.body.account_name;
            }
        })
        await customer.save();
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
        res.redirect(`/customers/${customer.id}`);        

    } catch {
        if (customer == null) {
            res.redirect('/');
        } else {
            res.render('customers/editAcc', {
                customer: customer,
                errorMessage: 'Error updating account'
            })
        }
    }
})

// Delete customer
router.delete('/:id', async (req, res) => {
    const startDate = Date.now();
    let customer;
    try {
        customer = await Customer.findById(req.params.id);
        await customer.remove();
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
        res.redirect('/customers');
    } catch {
        if(customer == null) {
            res.redirect('/');
        } else {
        res.redirect(`/customers/${customer.id}`);
        }
    }
})

// Delete customer's account
router.patch('/del/:id/:accid', async (req, res) => {
    const startDate = Date.now();
    let customer;
    try {
        customer = await Customer.findById(req.params.id);

        customer.accounts = customer.accounts.filter( acc =>  acc.id !== req.params.accid ) 

        await customer.save();        
        const endDate = Date.now();
        console.log('Cloud Processing Latency: ' + (endDate - startDate) + 'ms');
        res.redirect(`/customers/${customer.id}`);


    } catch {
        if(customer == null) {
            res.redirect('/');
        } else {
        res.redirect(`/customers/${customer.id}`);
        }
    }
})

module.exports = router;