require('./configuration/config');
require('./mongoose/mongoose');

const filters = require('./utils/filters');

const express = require('express');
const app = express();

const body_parser = require('body-parser');

app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: true
}));

const {
    pick
} = require('lodash');

app.use((request, response, next) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/filter', (request, response) => {

    // filters.productByNoOfItems("Product", 0, 'gt')
    //     .then(result => response.send(result))
    //     .catch(error => response.send(error));
});

module.exports = app;