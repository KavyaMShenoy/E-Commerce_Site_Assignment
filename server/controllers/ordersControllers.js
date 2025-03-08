const Orders = require('../models/ordersModel');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find().populate('userId').populate('product');

        if (orders.length === 0) {
            return res.status(404).json({
                message: 'No orders found.',
                success: false
            })
        }

        return res.status(200).json({
            orders: orders,
            success: true
        })
    } catch (error) {
        next(error);
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        return res.status(200).json({
            message: "Order created Successfully.",
            order: order,
            success: true
        })
    } catch (error) {
        next(error);
    }
};
