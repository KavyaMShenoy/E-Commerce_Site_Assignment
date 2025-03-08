const Products = require('../models/productsModel');

//Get all products.
exports.getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await Products.find();

        if (allProducts.length === 0) {
            return res.status(404).json({
                message: 'No products found.',
                success: false
            })
        }

        return res.status(200).json({
            products: allProducts,
            success: true
        })
    } catch (error) {
        next(error);
    }
}

//Get product by id.
exports.getProductById = async (req, res, next) => {
    try {

        const productId = req.params.id;

        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'No product found.',
                success: false
            })
        }

        return res.status(200).json({
            product: product,
            success: true
        })
    } catch (error) {
        next(error);
    }
}

// Add a new product.
exports.addProduct = async (req, res, next) => {
    try {
        const { name, price, imageURL, description, stock } = req.body;

        const isExistingProduct = await Products.findOne({ name });

        if (isExistingProduct) {
            return res.status(400).json({
                message: 'Products already exists.',
                success: false
            })
        }

        const newProduct = new Products({ name, price, imageURL, description, stock });

        await newProduct.save();

        return res.status(201).json({
            message: "Product created Successfully.",
            newProduct: newProduct,
            success: true
        });
    } catch (error) {
        next(error);
    }
}

// Update a product
exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                message: 'No products found.',
                success: false
            })
        }

        return res.status(200).json({
            updatedProduct: updatedProduct,
            success: true
        });
    } catch (error) {
        next(error);
    }
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        const isExistingProduct = await Products.findById(productId);

        if (!isExistingProduct) {
            return res.status(404).json({
                message: 'No products found.',
                success: false
            })
        }

        await Products.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: 'Product deleted',
            success: true
        });
    } catch (error) {
        next(error);
    }
};