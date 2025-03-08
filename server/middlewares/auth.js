const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided.",
                success: false
            })
        }

        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

        if (!verifiedToken) {
            return res.status(401).json({
                message: "Unauthorized",
                success: false
            })
        }

        req.user = verifiedToken.userId;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
            success: false
        })
    }
}

module.exports = auth;