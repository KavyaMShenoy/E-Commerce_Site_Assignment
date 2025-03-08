const Users = require('../models/usersModel');

const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {

        const { name, email, password, role } = req.body;

        const isUserExist = await Users.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({
                message: 'User already exists.',
                success: false
            });
        }

        const user = new Users({ name, email, password, role });

        await user.save();

        return res.status(201).json({
            message: 'User registration successful.',
            success: true
        });

    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const isUserExist = await Users.findOne({ email });

        if (!isUserExist) {
            return res.status(400).json({
                message: 'No user found.',
                success: false
            });
        }

        const passwordMatch = await isUserExist.matchPassword(password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: 'Invalid Password.',
                success: false
            })
        }

        const token = jwt.sign({ userId: isUserExist._id, email: isUserExist.email, role: isUserExist.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({
            message: "User login success.",
            success: true,
            token: token
        })

    } catch (error) {
        next(error);
    }
};