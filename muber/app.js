const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
// app wiil accept http requests 
// and contains our router/controller/models
const app = express();

// mongoose.Promise = global.Promise;
// unless we are in test environemnt, connect to the actual muber DB
// if we are in test environment, connection will be handled in test_helper
if (process.env.NODE_ENV !== 'test'){
    mongoose.connect('mongodb://localhost/muber', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

// any incoming request, assume it's json and parse it for us
app.use(bodyParser.json());

// call routes function with our app object
routes(app);

// error handling middleware, incase the request handler has an error and doesn't return a response
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});

module.exports = app;