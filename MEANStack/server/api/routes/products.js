const express  = require('express');
const router = express.Router();
const Product = require('../models/product'); 
const productController = require('../controllers/products');


// Hendle get incomming request
router.get('/', productController.get_all_product);

router.post('/', productController.post_product);

router.put('/', productController.put_product);

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    
    Product.findOneAndRemove({ _id: id })
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

router.get('/:productId', (req, res, next) => {
    var id = req.params.productId;
   
Product.findById({ _id: id }).exec()
.select('name price _id productImage')
.then(docs => { 
    if(docs) {
        res.status(200).json(docs);
    } else {
        res.status(400).json({
            message: "No record Found" + id
        });
    }
}).catch(err => {
    res.status(500).json({ 
        message: "No valid entry found this id",
     })
    });
});

module.exports = router;