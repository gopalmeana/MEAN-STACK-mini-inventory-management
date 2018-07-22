const Product = require('../models/product'); 
const mongoose = require('mongoose');

exports.get_all_product =  (req, res, next) => {
    Product.find()
    .select('produtName quantityOfProduct _id status')// for which selected field we need to get from database
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            serverStatus: 'success',
            product: docs.map(doc => {
                return {
                    produtName: doc.produtName,
                    quantityOfProduct: doc.quantityOfProduct,
                    _id: doc._id,
                    status: doc.status,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
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

exports.post_product = (req, res, next) => {

    const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    produtName: req.body.produtName,
    quantityOfProduct: req.body.quantityOfProduct,
    status: req.body.status,
});
product.save()
.then(result => {res.status(200).json(result)})
.catch(err => {
    res.status(500).json({
        message: 'database error',
        error: err
    });
});               
};

exports.put_product = (req, res, next) => {
    const id = req.body._id;

    const updatedOps = {};
    updatedOps.produtName = req.body.produtName;
    updatedOps.quantityOfProduct = req.body.quantityOfProduct;
    updatedOps.status = req.body.status;
    Product.update({_id: id}, { $set: updatedOps })
    .exec()
    .then(result => {res.status(200).json(result)})
    .catch(err => {res.status(500).json({error: err,
    message: "data not available"})});
};