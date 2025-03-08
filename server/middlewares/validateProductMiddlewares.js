const validateProductMiddleware = (req, res, next) => {
    const { name, price, imageURL, description, stock } = req.body;

    if (!name || !price || !imageURL || !description || !stock) {
        return res.status(400).json({ message: "Product name, price, imageURL, description, category and stock are required." });
    }

    if ((typeof price === 'string') && !isNaN(price)) {
        return res.status(400).json({ message: "Price should not be a string." });
    }

    if ((typeof stock === 'string') && !isNaN(stock)) {
        return res.status(400).json({ message: "Stock should not be a string." });
    }

    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ message: "Invalid Price." });
    }

    if (isNaN(stock) || stock <= 0) {
        return res.status(400).json({ message: "Invalid Stock." });
    }

    next();
}

module.exports = validateProductMiddleware;