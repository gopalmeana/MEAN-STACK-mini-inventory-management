const Customer = require('../models/customer');

const mongoose = require('mongoose');

exports.get_all_customer =  (req, res, next) => {
    Customer.find()
    .select('customerName quantiOfProdReq _id status produtName')// for which selected field we need to get from database
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            customer: docs.map(doc => {
                return {
                    customerName: doc.customerName,
                    quantiOfProdReq: doc.quantiOfProdReq,
                    _id: doc._id,
                    status: doc.status,
                    produtName: doc.produtName,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/customers/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
        error: err
    });
});
   
};
exports.post_customer = (req, res, next) => {
    const customer = new Customer({
    _id: new mongoose.Types.ObjectId(),
    customerName: req.body.customerName,
    quantiOfProdReq: req.body.quantiOfProdReq,
    status: req.body.status,
    produtName: req.body.produtName,
});
customer.save()
.then(result => {res.status(200).json(result)})
.catch(err => {
    res.status(500).json({
        message: 'database error',
        error: err
    });
});               
};

exports.put_customer = (req, res, next) => {
    const id = req.body._id;
    Customer.findOneAndRemove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                result: result,
                serverStatus: 'delete',
                message: 'Customer deleted successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};