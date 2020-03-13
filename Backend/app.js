require('./configuration/config');
require('./mongoose/mongoose');
require('./models/user');
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

const {
    check
} = require('./utils/check');

app.use((request, response, next) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/filter', (request, response) => {

    let obj = pick(request.body, ['key', 'value', 'operation', 'model']);
    check(obj.key, obj.value, obj.operation, obj.model).then(
            (result) => {
                response.send({
                    status: result
                })
            }
        )
        .catch(err => {
            response.send({
                status: err
            })
        });
});

module.exports = app;