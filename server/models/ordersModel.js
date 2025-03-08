const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }
}, { timestamps: true });

const ordersModel = mongoose.model('Orders', ordersSchema);

module.exports = ordersModel;
