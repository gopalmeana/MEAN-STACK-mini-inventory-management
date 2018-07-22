const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customer');

router.get('/', customerController.get_all_customer);

router.post('/', customerController.post_customer);

router.put('/', customerController.put_customer);


module.exports = router;