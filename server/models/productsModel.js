const { default: mongoose } = require('mongoose');

const productsSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true }
})

const productsModel = mongoose.model('Products', productsSchema);

module.exports = productsModel;