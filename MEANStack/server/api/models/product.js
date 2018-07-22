const mongoose = require('mongoose');

const produtSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    produtName: { type: String, required: true },
    quantityOfProduct: { type: Number, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('ProductInventory', produtSchema);