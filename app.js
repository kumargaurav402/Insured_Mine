"use strict";

require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();
const hbs = require('hbs');
const cors = require('cors');

app.use(helmet());
app.use(cors());
app.disable('x-powered-by');
app.set('view engine', 'hbs');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//mongodb connection//
mongoose.connect('mongodb://suraj_kumarr:Suraj7990k@ds247670.mlab.com:47670/dev_mongodb', { useNewUrlParser: true }, (err, doc) => {
    if (err) {
        console.log('data base connection failed');
    } else {
        console.log('connected to database correctly');
    }
});

/*Router Path */
require('./router/userRouter')(app);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, x-access-token, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(function (req, res, next) {
    res.render('notFound.hbs', {
        pageTitle: 'NOT FOUND',
        pageBody: 'the page you requested could not found',
        pageStatus: '404'
    })
})

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        server_message: err.message,
        error: err
    })
})

module.exports = app;