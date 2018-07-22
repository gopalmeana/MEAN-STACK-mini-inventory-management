const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerName: { type: String, required: true },
    quantiOfProdReq: { type: Number, required: true },
    status: { type: String, required: true },
    produtName: { type: String, required: true }
});

module.exports = mongoose.model('Customer', customerSchema);