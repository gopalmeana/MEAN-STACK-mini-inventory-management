const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoute = require('./api/routes/products');
const customers = require('./api/routes/customer');

mongoose.connect(
    "mongodb://node-shop:" + "node-shop" +  "@node-rest-shop-shard-00-00-703un.mongodb.net:27017,node-rest-shop-shard-00-01-703un.mongodb.net:27017,node-rest-shop-shard-00-02-703un.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true"
    ).then(() => { // if all is ok we will be here
        // return server.start();
    })
    .catch(err => { // we will not be here...
        console.error('App starting error:', err.stack);
        process.exit(1);
    });

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
console.log('server call');

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Route which shoud handle request
app.use('/products', productRoute);
app.use('/customers', customers);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;
