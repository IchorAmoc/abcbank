if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const indexR = require('./routes/index');
const customerR = require('./routes/customers');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexR);
app.use('/customers', customerR); 

app.listen(process.env.PORT || 3000);